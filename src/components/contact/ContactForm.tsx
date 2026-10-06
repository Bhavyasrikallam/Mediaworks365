"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { contactPage, inquiryTypes, type InquiryType } from "@/content/site";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/primitives";
import {
  budgetOptions,
  HONEYPOT_FIELD,
  LEAD_FIELD_ORDER,
  MESSAGE_MAX,
  MESSAGE_REQUIRED_FOR,
  NOT_SURE,
  serviceOptions,
  validateLead,
  type LeadField,
  type LeadFieldErrors,
  type LeadRequestBody,
  type LeadResponse,
} from "@/lib/leads";
import { inquiryCopy } from "./copy";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  website: string;
  budget: string;
  message: string;
  consent: boolean;
};

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: NOT_SURE,
  website: "",
  budget: "",
  message: "",
  consent: false,
};

const fieldLabels: Record<LeadField, string> = {
  type: "Inquiry type",
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  service: "Service interest",
  website: "Website URL",
  budget: "Budget range",
  message: "Message",
  consent: "Consent",
};

type Status = "idle" | "submitting" | "success";

const inputBase =
  "block w-full min-h-12 rounded-xl border bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-500 transition-colors focus:border-ink-900 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

export function ContactForm({ initialType, fallbackEmail }: { initialType: InquiryType; fallbackEmail?: string }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const [type, setType] = useState<InquiryType>(initialType);
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const mountedAt = useRef<number>(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const serverErrorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const copy = inquiryCopy[type];
  const messageRequired = MESSAGE_REQUIRED_FOR.includes(type);
  const errorEntries = LEAD_FIELD_ORDER.filter((f) => errors[f]).map((f) => [f, errors[f]!] as const);

  function payloadFor(v: Values, t: InquiryType) {
    return {
      type: t,
      name: v.name,
      email: v.email,
      phone: v.phone,
      company: v.company,
      service: v.service,
      website: t === "audit" ? v.website : "",
      budget: t === "quote" ? v.budget : "",
      message: v.message,
      consent: v.consent,
    };
  }

  /** After a failed submit, re-check as the user types so errors clear promptly. */
  function revalidate(next: Values, t: InquiryType) {
    if (Object.keys(errors).length === 0) return;
    const result = validateLead(payloadFor(next, t));
    if (result.ok) {
      setErrors({});
      return;
    }
    // Only keep/refresh errors on fields that already showed one; don't nag about untouched fields.
    const kept: LeadFieldErrors = {};
    for (const f of Object.keys(errors) as LeadField[]) {
      if (result.fieldErrors[f]) kept[f] = result.fieldErrors[f];
    }
    setErrors(kept);
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    revalidate(next, type);
  }

  function selectType(next: InquiryType) {
    if (next === type) return;
    setType(next);
    revalidate(values, next);
    startTransition(() => {
      router.replace(`/contact?type=${next}`, { scroll: false });
    });
  }

  function focusFirstInvalid(fieldErrors: LeadFieldErrors) {
    const first = LEAD_FIELD_ORDER.find((f) => fieldErrors[f]);
    if (first) document.getElementById(id(first))?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setServerError(null);

    const result = validateLead(payloadFor(values, type));
    if (!result.ok) {
      setErrors(result.fieldErrors);
      setShowSummary(true);
      // Wait for the summary to render, then move focus to it.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setShowSummary(false);
    setStatus("submitting");

    const body: LeadRequestBody = {
      ...payloadFor(values, type),
      consent: true,
      [HONEYPOT_FIELD]: honeypot,
      elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : 0,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => null)) as LeadResponse | null;

      if (res.ok && data?.ok) {
        setStatus("success");
        // Hook for future consent-gated analytics. Inquiry type only — never PII.
        window.dispatchEvent(new CustomEvent("lead_submitted", { detail: { type } }));
        return;
      }

      setStatus("idle");
      if (data && !data.ok && data.error === "validation_failed") {
        setErrors(data.fieldErrors);
        setShowSummary(true);
        requestAnimationFrame(() => {
          if (summaryRef.current) summaryRef.current.focus();
          else focusFirstInvalid(data.fieldErrors);
        });
        return;
      }
      if (res.status === 429) {
        setServerError("You've sent several messages in a short time. Please wait a few minutes and try again.");
      } else {
        setServerError(
          fallbackEmail
            ? `We couldn't send your message just now. Please try again, or email us directly at ${fallbackEmail}.`
            : "We couldn't send your message just now. Please try again later.",
        );
      }
      requestAnimationFrame(() => serverErrorRef.current?.focus());
    } catch {
      setStatus("idle");
      setServerError(
        fallbackEmail
          ? `We couldn't reach our server. Check your connection and try again, or email us at ${fallbackEmail}.`
          : "We couldn't reach our server. Check your connection and please try again later.",
      );
      requestAnimationFrame(() => serverErrorRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-ink-100 bg-white p-6 shadow-[0_30px_80px_-40px_rgb(8_8_10/0.35)] sm:p-10">
        <div className="flex flex-col items-start gap-5" role="status">
          <span className="grid size-14 place-items-center rounded-full bg-brand-500/15 text-brand-700">
            <CheckCircle2 aria-hidden="true" className="size-7" />
          </span>
          <h2 ref={successRef} tabIndex={-1} className="text-2xl font-semibold outline-none sm:text-3xl">
            {contactPage.successTitle}
          </h2>
          <p className="text-base leading-relaxed text-ink-600 sm:text-lg">{contactPage.successBody}</p>
          <Link href="/services" className={buttonClasses("ghost-light", "mt-2")}>
            Explore our services
          </Link>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";
  const describedBy = (field: LeadField, ...extra: (string | false)[]) =>
    [errors[field] && id(`${field}-error`), ...extra].filter(Boolean).join(" ") || undefined;

  return (
    <div className="rounded-[var(--radius-card)] border border-ink-100 bg-white p-5 shadow-[0_30px_80px_-40px_rgb(8_8_10/0.35)] sm:p-8 lg:p-10">
      <fieldset className="min-w-0">
        <legend className="mb-3 text-sm font-semibold text-ink-900">How can we help?</legend>
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-ink-50 p-1.5 sm:grid-cols-4"
        >
          {inquiryTypes.map((t) => {
            const active = t.value === type;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={active}
                onClick={() => selectType(t.value)}
                className={cn(
                  "min-h-11 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                  active ? "bg-ink-950 text-white shadow-sm" : "text-ink-600 hover:bg-white hover:text-ink-900",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7" aria-live="polite">
        <h2 className="text-2xl font-semibold sm:text-3xl">{copy.heading}</h2>
        <p className="mt-2 text-base leading-relaxed text-ink-600">{copy.helper}</p>
      </div>

      <form noValidate onSubmit={onSubmit} aria-busy={submitting} className="mt-7 space-y-5">
        {showSummary && errorEntries.length > 0 && (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            aria-labelledby={id("summary-title")}
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900 outline-none focus-visible:outline-3 focus-visible:outline-red-600"
          >
            <p id={id("summary-title")} className="flex items-center gap-2 font-semibold">
              <AlertCircle aria-hidden="true" className="size-5 shrink-0" />
              Please fix {errorEntries.length === 1 ? "1 problem" : `${errorEntries.length} problems`} to continue
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-9 text-sm">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a
                    href={`#${id(field)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id(field))?.focus();
                    }}
                    className="underline underline-offset-2 hover:no-underline"
                  >
                    {fieldLabels[field]}: {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" required htmlFor={id("name")} error={errors.name} errorId={id("name-error")}>
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className={cn(inputBase, errors.name ? "border-red-500" : "border-ink-200")}
            />
          </Field>
          <Field label="Email" required htmlFor={id("email")} error={errors.email} errorId={id("email-error")}>
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className={cn(inputBase, errors.email ? "border-red-500" : "border-ink-200")}
            />
          </Field>
          <Field label="Phone" htmlFor={id("phone")} error={errors.phone} errorId={id("phone-error")}>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={30}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone")}
              className={cn(inputBase, errors.phone ? "border-red-500" : "border-ink-200")}
            />
          </Field>
          <Field label="Company" htmlFor={id("company")} error={errors.company} errorId={id("company-error")}>
            <input
              id={id("company")}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={120}
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy("company")}
              className={cn(inputBase, errors.company ? "border-red-500" : "border-ink-200")}
            />
          </Field>
        </div>

        <Field label="Service interest" htmlFor={id("service")} error={errors.service} errorId={id("service-error")}>
          <select
            id={id("service")}
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describedBy("service")}
            className={cn(inputBase, "appearance-auto pr-10", errors.service ? "border-red-500" : "border-ink-200")}
          >
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        {type === "audit" && (
          <Field
            label="Website URL"
            htmlFor={id("website")}
            error={errors.website}
            errorId={id("website-error")}
            hint="The site you'd like us to review, e.g. example.com"
            hintId={id("website-hint")}
          >
            <input
              id={id("website")}
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={200}
              value={values.website}
              onChange={(e) => update("website", e.target.value)}
              aria-invalid={Boolean(errors.website)}
              aria-describedby={describedBy("website", id("website-hint"))}
              className={cn(inputBase, errors.website ? "border-red-500" : "border-ink-200")}
            />
          </Field>
        )}

        {type === "quote" && (
          <Field label="Budget range" htmlFor={id("budget")} error={errors.budget} errorId={id("budget-error")}>
            <select
              id={id("budget")}
              name="budget"
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={describedBy("budget")}
              className={cn(inputBase, "appearance-auto pr-10", errors.budget ? "border-red-500" : "border-ink-200")}
            >
              <option value="">Select a range (optional)</option>
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field
          label="Message"
          required={messageRequired}
          htmlFor={id("message")}
          error={errors.message}
          errorId={id("message-error")}
        >
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX}
            required={messageRequired}
            placeholder={copy.messagePlaceholder}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", id("message-count"))}
            className={cn(inputBase, "min-h-36 resize-y", errors.message ? "border-red-500" : "border-ink-200")}
          />
          <p
            id={id("message-count")}
            className={cn(
              "mt-1.5 text-right text-xs tabular-nums",
              values.message.length >= MESSAGE_MAX ? "font-semibold text-red-700" : "text-ink-500",
            )}
          >
            {values.message.length.toLocaleString("en-US")} / {MESSAGE_MAX.toLocaleString("en-US")} characters
          </p>
        </Field>

        {/* Honeypot: hidden from people and assistive tech; bots that fill it are silently dropped. */}
        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor={id(HONEYPOT_FIELD)}>Leave this field empty</label>
          <input
            id={id(HONEYPOT_FIELD)}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy("consent")}
              className="mt-0.5 size-6 shrink-0 cursor-pointer rounded accent-brand-600"
            />
            <label htmlFor={id("consent")} className="cursor-pointer text-sm leading-relaxed text-ink-700 sm:text-base">
              I agree to be contacted about my inquiry and accept the{" "}
              <Link href="/privacy" className="font-semibold text-brand-700 underline underline-offset-2 hover:no-underline">
                Privacy Policy
              </Link>
              .{" "}
              <span className="text-red-700">
                *<span className="sr-only"> (required)</span>
              </span>
            </label>
          </div>
          {errors.consent && <ErrorText id={id("consent-error")}>{errors.consent}</ErrorText>}
        </div>

        {serverError && (
          <div
            ref={serverErrorRef}
            tabIndex={-1}
            role="alert"
            className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 outline-none focus-visible:outline-3 focus-visible:outline-red-600 sm:text-base"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>
              {serverError}
              {fallbackEmail && (
                <>
                  {" "}
                  <a href={`mailto:${fallbackEmail}`} className="font-semibold underline underline-offset-2">
                    Email {fallbackEmail}
                  </a>
                </>
              )}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-500">
            <span className="text-red-700">*</span> Required
          </p>
          <button
            type="submit"
            disabled={submitting}
            className={buttonClasses("primary", "w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto")}
          >
            {submitting ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
                Sending…
              </>
            ) : (
              <>
                {contactPage.submitLabel}
                <Send aria-hidden="true" className="size-4" />
              </>
            )}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {submitting ? "Sending your message…" : ""}
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  errorId,
  hint,
  hintId,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label}
        {required ? (
          <span className="text-red-700">
            {" "}
            *<span className="sr-only"> (required)</span>
          </span>
        ) : (
          <span className="font-normal text-ink-500"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-ink-500">
          {hint}
        </p>
      )}
      {children}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-700">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}

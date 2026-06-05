"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { CONTACT_COUNTRIES, type ContactFormPayload } from "@/types/contact";

import styles from "./ContactForm.module.css";

type ContactFormProps = {
  id?: string;
};

type ContactFormState = {
  name: string;
  email: string;
  country: ContactFormPayload["country"] | "";
  phone: string;
  message: string;
  acceptTerms: boolean;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  country: "",
  phone: "",
  message: "",
  acceptTerms: false,
};

export function ContactForm({ id = "contacto" }: ContactFormProps) {
  const { dict, href } = useI18n();
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? dict.contact.error);
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : dict.contact.error,
      );
    }
  }

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.layout}>
        <div className={styles.formColumn}>
            <h2
              id={`${id}-title`}
              className="text-3xl font-bold uppercase tracking-wide text-drija-green sm:text-4xl"
            >
              {dict.contact.title}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="contact-form mt-8 flex flex-col gap-5"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase text-neutral-900">
                  {dict.contact.name}
                </span>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={styles.field}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase text-neutral-900">
                  {dict.contact.email}
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={styles.field}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase text-neutral-900">
                  {dict.contact.country}
                </span>
                <div className={styles.selectWrap}>
                  <select
                    required
                    name="country"
                    value={form.country}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        country: e.target.value as ContactFormState["country"],
                      })
                    }
                    className={`${styles.field} ${styles.select}`}
                  >
                    <option value="">{dict.contact.countryPlaceholder}</option>
                    {CONTACT_COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase text-neutral-900">
                  {dict.contact.phone}
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={styles.field}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase text-neutral-900">
                  {dict.contact.message}
                </span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${styles.field} ${styles.textarea}`}
                />
              </label>

              <label className="flex items-start gap-2.5">
                <input
                  required
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) =>
                    setForm({ ...form, acceptTerms: e.target.checked })
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-drija-green"
                />
                <span className="text-xs font-bold uppercase leading-relaxed text-drija-green">
                  {dict.contact.termsAccept}{" "}
                  <Link
                    href={href("/avisos-legales")}
                    className="underline decoration-drija-green/60 underline-offset-2 hover:decoration-drija-green"
                  >
                    {dict.contact.termsLink}
                  </Link>
                  .
                </span>
              </label>

              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={styles.submit}
                >
                  {status === "loading"
                    ? dict.contact.sending
                    : dict.contact.submit}
                </button>
              </div>

              {status === "success" && (
                <p className="text-sm font-medium text-drija-green" role="status">
                  {dict.contact.success}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}
            </form>
        </div>

        <div className={styles.imageColumn} aria-hidden="true">
          <div className={styles.imageFrame}>
            <Image
              src="/images/contact/contact-us.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

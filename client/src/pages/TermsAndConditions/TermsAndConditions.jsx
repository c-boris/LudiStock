import { useTranslation } from "react-i18next";

function TermsConditions() {
  const { t } = useTranslation();

  return (
    <>
      <main className="bg-light dark:bg-dark text-secondary dark:text-dsecondary flex flex-col items-center">
        <section className="mt-10 flex flex-col px-10 w-full lg:w-2/3 ">
          <div className="flex flex-col border-2 mt-20 mb-5 dark:border-primary border-secondary rounded-xl px-7 py-7 max-h-[350px] overflow-y-auto gap-2">
            <h1 className="font-heading text-lg">{t("terms.heading")}</h1>
            <p className="mb-4 ">{t("terms.effectiveDate")}</p>

            <h1 className="font-heading m-2">{t("terms.acceptance.title")}</h1>
            <p className="px-5">{t("terms.acceptance.content1")}</p>
            <p className="px-5">{t("terms.acceptance.content2")}</p>

            <h1 className="font-heading m-2">{t("terms.use.title")}</h1>
            <p className="px-5">{t("terms.use.content1")}</p>

            <h1 className="font-heading m-2">{t("terms.privacy.title")}</h1>
            <p className="px-5">{t("terms.privacy.content1")}</p>
            <p className="px-5">{t("terms.privacy.content2")}</p>

            <h1 className="font-heading m-2">{t("terms.content.title")}</h1>
            <p className="px-5">{t("terms.content.content1")}</p>
            <p className="px-5">{t("terms.content.content2")}</p>

            <h1 className="font-heading m-2">{t("terms.conduct.title")}</h1>
            <p className="px-5">{t("terms.conduct.content1")}</p>
            <ul className="px-10">
              <li>{t("terms.conduct.activity1")}</li>
              <li>{t("terms.conduct.activity2")}</li>
              <li>{t("terms.conduct.activity3")}</li>
              <li>{t("terms.conduct.activity4")}</li>
            </ul>

            <h1 className="font-heading m-2">{t("terms.warranties.title")}</h1>
            <p className="px-5">{t("terms.warranties.content1")}</p>

            <h1 className="font-heading m-2">{t("terms.liability.title")}</h1>
            <p className="px-5">{t("terms.liability.content1")}</p>

            <h1 className="font-heading m-2">{t("terms.termination.title")}</h1>
            <p className="px-5">{t("terms.termination.content1")}</p>

            <h1 className="font-heading m-2">
              {t("terms.governingLaw.title")}
            </h1>
            <p className="px-5">{t("terms.governingLaw.content1")}</p>

            <h1 className="font-heading m-2">{t("terms.contact.title")}</h1>
            <p className="px-5">{t("terms.contact.content1")}</p>
          </div>
        </section>

        <section className="mt-10 flex flex-col px-10 w-full lg:w-2/3">
          <div className="flex flex-col border-2 mb-5 dark:border-primary border-secondary rounded-xl px-7 py-7 max-h-[350px] overflow-y-auto gap-2">
            <h1 className="font-heading mb-3 text-lg">
              {t("privacy.heading")}
            </h1>
            <p className="mb-4 px-5">{t("privacy.effectiveDate")}</p>

            <h2 className="font-heading m-2">
              {t("privacy.collectInfo.title")}
            </h2>
            <p className="px-5">{t("privacy.collectInfo.content1")}</p>
            <p className="px-5">{t("privacy.collectInfo.content2")}</p>
            <p className="px-5">{t("privacy.collectInfo.content3")}</p>

            <h2 className="font-heading m-2">{t("privacy.useInfo.title")}</h2>
            <p className="px-5">{t("privacy.useInfo.content1")}</p>
            <p className="px-5">{t("privacy.useInfo.content2")}</p>
            <p className="px-5">{t("privacy.useInfo.content3")}</p>

            <h2 className="font-heading m-2">
              {t("privacy.dataSecurity.title")}
            </h2>
            <p className="px-5">{t("privacy.dataSecurity.content")}</p>

            <h2 className="font-heading m-2">
              {t("privacy.disclosure.title")}
            </h2>
            <p className="px-5">{t("privacy.disclosure.content")}</p>

            <h2 className="font-heading m-2">{t("privacy.choices.title")}</h2>
            <p className="px-5">{t("privacy.choices.content1")}</p>
            <p className="px-5">{t("privacy.choices.content2")}</p>

            <h2 className="font-heading m-2">{t("privacy.children.title")}</h2>
            <p className="px-5">{t("privacy.children.content")}</p>

            <h2 className="font-heading m-2">{t("privacy.changes.title")}</h2>
            <p className="px-5">{t("privacy.changes.content")}</p>

            <h2 className="font-heading m-2">{t("privacy.contact.title")}</h2>
            <p className="px-5">{t("privacy.contact.content")}</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default TermsConditions;

import { useTranslation } from "react-i18next";

import type { ReactNode } from "react";

const InfoItem = ({ title, info }: { title: string; info?: ReactNode }) => {
  const { t } = useTranslation("animals");

  return (
    <div style={{ fontSize: 16 }}>
      <b style={{ marginRight: 4 }}>{t(title)}:</b>
      <span>{info}</span>
    </div>
  );
};

export default InfoItem;

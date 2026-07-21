import "./CompanyFactsheet.css";
import { strings } from "../../comms/strings";

type CompanyFactsheetProps = {
  variant?: "full" | "compact";
  showTitle?: boolean;
};

export function CompanyFactsheet({ variant = "full", showTitle = true }: CompanyFactsheetProps) {
  const { company, companyProfile: profile } = strings;

  const basicRows: { label: string; value: string }[] = [
    { label: "Nature of business", value: profile.natureOfBusiness },
    {
      label: "Additional business",
      value: profile.additionalBusiness.join(" · "),
    },
    { label: "Company CEO", value: profile.companyCeo },
    { label: "GST registration date", value: company.gstRegistrationDate },
    { label: "Date of incorporation", value: company.incorporationDate },
    { label: "Year of establishment", value: company.yearEstablished },
    { label: "Legal status of firm", value: profile.legalStatus },
    { label: "GST partner name", value: profile.gstPartnerName },
  ];

  const statutoryRows: { label: string; value: string }[] = [
    { label: strings.company.gstLabel.replace(":", ""), value: company.gstNumber },
    { label: strings.company.cinLabel.replace(":", ""), value: company.cinNumber },
    { label: "Registered with", value: company.roc },
    { label: "Registered address", value: strings.header.location },
  ];

  return (
    <div className={`company-factsheet company-factsheet--${variant}`}>
      {showTitle ? <h2 className="company-factsheet__title">{profile.factsheetHeading}</h2> : null}

      <h3 className="company-factsheet__subtitle">{profile.basicInfoHeading}</h3>
      <div className="company-factsheet__table-wrap">
        <table className="company-factsheet__table">
          <tbody>
            {basicRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="company-factsheet__subtitle">{profile.statutoryHeading}</h3>
      <div className="company-factsheet__table-wrap">
        <table className="company-factsheet__table">
          <tbody>
            {statutoryRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

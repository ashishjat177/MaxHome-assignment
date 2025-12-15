type Props = {
  partner: string;
  onChange: (value: string) => void;
};

export default function PartnerSwitcher({ partner, onChange }: Props) {
  return (
    <div className="partner-switcher">
      <label>
        Partner: 
        <select value={partner} onChange={(e) => onChange(e.target.value)}>
          <option value="A">Partner A</option>
          <option value="B">Partner B</option>
        </select>
      </label>
    </div>
  );
}

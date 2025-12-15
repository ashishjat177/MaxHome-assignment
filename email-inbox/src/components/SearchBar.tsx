type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      placeholder="Search by sender or subject"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

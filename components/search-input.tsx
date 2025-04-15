import { Input } from "@heroui/input";

export interface PokemonSearchProps {
  handleChange: (e: string) => void;
  handleClear: () => void;
}

export const SearchInput = (props: PokemonSearchProps) => {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search by name or id"
      type="search"
      onClear={props.handleClear}
      onValueChange={props.handleChange}
    />
  );
};

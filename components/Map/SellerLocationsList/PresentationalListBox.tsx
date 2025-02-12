import { Button, Listbox, ListboxItem,  } from "@heroui/react";
import { SellerLocationsListProps } from "./types";
import { Trash2 } from "lucide-react";
import React from "react";
import { SellerLocation } from "@/components/SellerProfile/types";

export const ListboxWrapper = ({ children }: React.PropsWithChildren) => (
  <div className="border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

type PresentationalListBoxProps = {
  selectedLocation: SellerLocation,
  onSelectLocation: (address: string) => void,
  onDelete: (address: string) => void
} & SellerLocationsListProps

const PresentationalListBox = ({
  locations,
  selectedLocation,
  onSelectLocation,
  onDelete,
}: PresentationalListBoxProps) => {
  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox
          disallowEmptySelection
          aria-label="Single selection example"
          selectedKeys={selectedLocation && new Set([selectedLocation.address])}
          selectionMode="single"
          variant="flat"
          onSelectionChange={(valSet) => {
            const valArr = Array.from(valSet)
            onSelectLocation(valArr.length > 0 ? valArr[0].toString() : '')
          }}
        >
          {locations.map(({ address }) => (
            <ListboxItem 
              key={address} 
              value={address} 
              textValue={address}
              endContent={
                <Button className="w-fit px-0" variant="light" onPress={() => onDelete(address)}>
                  <Trash2 />
                </Button>
              }
            >
              {address}
            </ListboxItem>
          ))}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}

export default PresentationalListBox
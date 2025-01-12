import React from 'react'
import { ItemCardProps } from './types'
import { 
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image
 } from "@nextui-org/react"
import Title from '../ui/title';

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  image_url,
  price
}) => {
  return(
    <Card isPressable shadow="sm" onPress={() => console.log("item pressed")}>
      <CardHeader className="overflow-visible px-4 pt-4 pb-2">
        <Title>
          { name }
        </Title>
      </CardHeader>
      <CardBody>
        <Image
          alt={`Clothing item ${name}`}
          className="w-full h-48 object-cover rounded-md"
          height="200"
          src={image_url}
          width="300"
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <p className="text-default-500">{price}</p>
      </CardFooter>
    </Card>
  );
}

export default ItemCard


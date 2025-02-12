import React from 'react'
import { ItemCardProps } from './types'
import { 
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image
 } from "@heroui/react"
import Title from '@/components/ui/title';
import { formatPrice } from '@/lib/format';
import Description from '@/components/ui/description';

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  description,
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
          className="w-full h-48 object-center rounded-md"
          height="200"
          src={image_url || ''}
          isLoading={!image_url}
          width="300"
        />
        <Description>
          {description}
        </Description>
      </CardBody>
      <CardFooter className="text-small justify-between">
        <p className="text-default-500">{formatPrice(Number(price))}</p>
      </CardFooter>
    </Card>
  );
}

export default ItemCard


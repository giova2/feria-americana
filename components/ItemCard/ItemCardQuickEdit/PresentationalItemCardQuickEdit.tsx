import React from 'react'
import { PresentationalItemCardQuickEditProps } from './types'
import { 
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image
 } from "@heroui/react"
import Title from '@/components/ui/title';
import { formatPrice } from '@/lib/format';
import Description from '@/components/ui/description';

const PresentationalItemCardQuickEdit: React.FC<PresentationalItemCardQuickEditProps> = ({
  name,
  description,
  image_url,
  price,
  isEditingDescription,
  isEditingName,
  isEditingPrice,
  onDescriptionClick,
  onDescriptionBlur,
  onDescriptionKeyDown,
  onNameClick,
  onNameBlur,
  onNameKeyDown,
  onPriceClick,
  onPriceBlur,
  onPriceKeyDown,
  onSubmit,
  register,
  errors,
}) => {
  return(
    <Card shadow="sm">
      <CardHeader className="overflow-visible px-4 pt-4 pb-2">
        {isEditingName ? (
          <form onSubmit={onSubmit} onBlur={onNameBlur}>
            <input
              type="text"
              defaultValue={name || ''}
              {...register("name", { required: "name is required" })}
              onKeyDown={onNameKeyDown}
              onBlur={onNameBlur}
              autoFocus
              onFocus={(e) => e.target.select()}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </form>
        ) : (
        <Title onClick={onNameClick}>
          { name }
        </Title>
        )}
      </CardHeader>
      <CardBody>
        <Image
          alt={`Clothing item ${name}`}
          className="w-full h-48 object-center rounded-md"
          height="200"
          src={image_url || ''}
          width="300"
        />
        {isEditingDescription ? (
          <form onSubmit={onSubmit} onBlur={onDescriptionBlur}>
            <input
              type="text"
              defaultValue={description || ''}
              {...register("description", { required: "Description is required" })}
              onKeyDown={onDescriptionKeyDown}
              onBlur={onDescriptionBlur}
              autoFocus
              onFocus={(e) => e.target.select()}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </form>
        ) : (
          <Description onClick={onDescriptionClick}>
            {description}
          </Description>
        )}
      </CardBody>
      <CardFooter className="text-small justify-between" >
        {isEditingPrice ? (
          <form onSubmit={onSubmit} onBlur={onPriceBlur}>
            <input
              type="number"
              defaultValue={Number(price)}
              {...register("price", { required: "price is required" })}
              onKeyDown={onPriceKeyDown}
              onBlur={onPriceBlur}
              autoFocus
              onFocus={(e) => e.target.select()}
            />
            {errors.price && <span>{errors.price.message}</span>}
          </form>
        ) : (
          <p className="text-default-500" onClick={onPriceClick}>{formatPrice(Number(price))}</p>
        )}
        <Button variant='faded' 
          onPress={() => console.log('should open a modal')}>Edit</Button>
      </CardFooter>
    </Card>
  );
}

export default PresentationalItemCardQuickEdit


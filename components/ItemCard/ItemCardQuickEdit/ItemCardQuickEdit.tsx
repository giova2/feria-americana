import React, { useState } from 'react'
import PresentationalItemCardQuickEdit from './PresentationalItemCardQuickEdit'
import { ItemCardQuickEditFormProps, ItemCardQuickEditProps } from './types'
import { useForm } from 'react-hook-form';

const ItemCardQuickEdit: React.FC<ItemCardQuickEditProps> = ({
  onUpdateItem,
  ...item 
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { // Initialize form with current record data
      description: item.description,
      name: item.name,
      price: item.price,
    },
  });
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  const onSubmit = async (data: ItemCardQuickEditFormProps) => {
    console.log({ data })
    setIsEditingDescription(false); // Exit edit mode after submission
    setIsEditingName(false)
    setIsEditingPrice(false)
    try {
      await onUpdateItem(item.id, data); // Call API to update record
      reset(data); // Reset form with updated data (optional, if you re-fetch data, you might skip this)
    } catch (error) {
      console.error("Update failed:", error);
      // Handle error - maybe revert input value or show error message
    }
  };

  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };
  const handleNameClick = () => {
    setIsEditingName(true);
  };
  const handlePriceClick = () => {
    setIsEditingPrice(true);
  };

  const handleDescriptionBlur = handleSubmit(onSubmit); // Use handleSubmit for onBlur
  const handleNameBlur = handleSubmit(onSubmit); // Use handleSubmit for onBlur
  const handlePriceBlur = handleSubmit(onSubmit); // Use handleSubmit for onBlur

  const handleDescriptionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission on Enter in input
      handleSubmit(onSubmit)(); // Manually trigger submission
      (e.target as HTMLInputElement).blur(); // Remove focus from input to trigger onBlur if needed in some scenarios
    }
  };
  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission on Enter in input
      handleSubmit(onSubmit)(); // Manually trigger submission
      (e.target as HTMLInputElement).blur(); // Remove focus from input to trigger onBlur if needed in some scenarios
    }
  };
  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission on Enter in input
      handleSubmit(onSubmit)(); // Manually trigger submission
      (e.target as HTMLInputElement).blur(); // Remove focus from input to trigger onBlur if needed in some scenarios
    }
  };

  const descriptionFunctions = {
    onDescriptionClick: handleDescriptionClick,
    onDescriptionBlur: handleDescriptionBlur,
    onDescriptionKeyDown: handleDescriptionKeyDown
  }
  const nameFunctions = {
    onNameClick: handleNameClick,
    onNameBlur: handleNameBlur,
    onNameKeyDown: handleNameKeyDown
  } 
  const priceFunctions = {
    onPriceClick: handlePriceClick,
    onPriceBlur: handlePriceBlur,
    onPriceKeyDown: handlePriceKeyDown
  } 

  return(<PresentationalItemCardQuickEdit 
    onSubmit={ () => handleSubmit(onSubmit) }
    register={ register }
    errors={ errors }
    isEditingDescription={ isEditingDescription }
    isEditingName={ isEditingName }
    isEditingPrice={ isEditingPrice }
    {...descriptionFunctions}
    {...nameFunctions}
    {...priceFunctions}
    {...item} 
  />);
}

export { ItemCardQuickEdit as default }
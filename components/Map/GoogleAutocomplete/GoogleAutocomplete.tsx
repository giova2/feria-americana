
import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { Input } from '@nextui-org/react'
import { GoogleAutocompleteProps } from './types'

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  onPlaceChangedAutocomplete = () => (null)
}) => {
  const [placesAutocomplete, setPlacesAutocomplete] = useState<google.maps.places.Autocomplete>()
  const [inputValue, setInputValue] = useState('')

  const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
    setPlacesAutocomplete(autocomplete)
  }
  
  const handlePlaceChangedAutocomplete = () => {
    console.log({ placesAutocomplete, place: placesAutocomplete?.getPlace() })
    onPlaceChangedAutocomplete(placesAutocomplete)
    setInputValue('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  
  return(
    <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={handlePlaceChangedAutocomplete} >
      <Input 
        value={inputValue} 
        type="text" 
        placeholder="Search for a place" 
        onChange={handleInputChange}
      />
    </Autocomplete>
  );
}

export { GoogleAutocomplete as default }

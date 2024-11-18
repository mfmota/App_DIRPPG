import React, { useState,useEffect } from 'react';
import { StyleSheet} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
interface SelectNucleoProps {
  onSelect: (selectedValues: string[]) => void; 
  selectedValues: (string | number)[];
}

const SelectNucleo: React.FC<SelectNucleoProps> = ({ onSelect,selectedValues }) => {

  const [selected, setSelected] = useState<string[]>(selectedValues.map(String));

  useEffect(() => {
    setSelected(selectedValues.map(String));
  }, [selectedValues]);

  const handleSelect = (val: string[]) => {
    setSelected(val);
    onSelect(val); 
  };

  const data = [
    { id: '1', name: 'DIRPPG-CT' },
    { id: '2', name: 'PROPPG' },
    { id: '3', name: 'CPGEI' },
    { id: '4', name: 'PPGA' },
    { id: '5', name: 'PPGCA' },
    { id: '6', name: 'PPGCTA' },
    { id: '7', name: 'PPGEB' },
    { id: '8', name: 'PPGEC' },
    { id: '9', name: 'PPGEF' },
    { id: '10', name: 'PPGEL' },
    { id: '11', name: 'PPGEM' },
    { id: '12', name: 'PPGEFA' },
    { id: '13', name: 'FCET' },
    { id: '14', name: 'PGP' },
    { id: '15', name: 'PPGQ' },
    { id: '16', name: 'PPGSAU' },
    { id: '17', name: 'PPGSE' },
    { id: '18', name: 'PPGTE' },
    { id: '19', name: 'PROFMAT' },
    { id: '20', name: 'PROFIAP' },
    { id: '21', name: 'DIREC-CT' },
    { id: '22', name: 'DIRGE-CT' },
    { id: '23', name: 'DIRPLAD-CT' },
  ];

  console.log(selected);

  const boxHeight = selected.length > 0 ? Math.min(hp(7) + selected.length * 10, hp(8)) : hp(5);

  return (
          <MultiSelect
          items={data}
          uniqueKey="id"  
          onSelectedItemsChange={handleSelect}
          selectedItems={selected}  
          selectText="Selecione os Núcleos"
          searchInputPlaceholderText="Pesquisar"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          hideSubmitButton
          fixedHeight
          styleMainWrapper = {styles.main}
          styleInputGroup = {styles.input}
          searchInputStyle= {styles.input}
          styleItemsContainer={styles.drop}
          styleSelectorContainer = {styles.drop}
          styleDropdownMenuSubsection = {styles.nucleo}
          /> 
  );
};

const styles = StyleSheet.create({
  nucleo:{
    backgroundColor: '#e8ebfa',
    paddingLeft:8,
    borderRadius:30,
    borderWidth:0
  },

  main:{
    width:'80%',
    alignSelf:'center',
    borderRadius:30,
    backgroundColor:'#e8ebfa',
    zIndex:999,
    marginBottom:10
  },

  input:{
    width: '80%',
    backgroundColor: '#e8ebfa',
    alignSelf: 'center',
    borderRadius:5
  },

  drop:{
    backgroundColor:'#e8ebfa',
    borderRadius:5,
    paddingHorizontal:2
  },
});

  
  export default SelectNucleo;
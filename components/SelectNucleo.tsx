import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {MultipleSelectList }from 'react-native-dropdown-select-list';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface SelectNucleoProps {
  onSelect: (selectedValues: string[]) => void; // Definindo o tipo da função de callback
}

const SelectNucleo: React.FC<SelectNucleoProps> = ({ onSelect }) => {

const [selected, setSelected] = useState<string[]>([]); 

  const data = [
    { key: '1', value: 'DIRPPG-CT' },
    { key: '2', value: 'PROPPG' },
    { key: '3', value: 'CPGEI' },
    { key: '4', value: 'PPGA' },
    { key: '5', value: 'PPGCA' },
    { key: '6', value: 'PPGCTA' },
    { key: '7', value: 'PPGEB' },
    { key: '8', value: 'PPGEC' },
    { key: '9', value: 'PPGEF' },
    { key: '10', value: 'PPGEL' },
    { key: '11', value: 'PPGEM' },
    { key: '12', value: 'PPGEFA' },
    { key: '13', value: 'FCET' },
    { key: '14', value: 'PGP' },
    { key: '15', value: 'PPGQ' },
    { key: '16', value: 'PPGSAU' },
    { key: '17', value: 'PPGSE' },
    { key: '18', value: 'PPGTE' },
    { key: '19', value: 'PROFMAT' },
    { key: '20', value: 'PROFIAP' },
    { key: '21', value: 'DIREC-CT' },
    { key: '22', value: 'DIRGE-CT' },
    { key: '23', value: 'DIRPLAD-CT' },
  ];

  const handleSelect = (val: string[]) => {
    setSelected(val);
    onSelect(val); 
  };
  

  const boxHeight = selected.length > 0 ? Math.min(hp(7) + selected.length * 10, hp(8)) : hp(5);

  return (
      <MultipleSelectList
        setSelected={(val: string[])=>setSelected(val)} 
        onSelect={()=>handleSelect(selected)}
        data={data} 
        label="Núcleo" 
        placeholder="Núcleo" 
        searchPlaceholder="Pesquise" 
        labelStyles={styles.label} 
        boxStyles={{...styles.box, minHeight:boxHeight}} 
        dropdownStyles={styles.drop} 
      />
  );
};



const styles = StyleSheet.create({
    label:{
        width:'80%',
        color:'#ddd',
        alignSelf:'center'
    },

    box:{
        width:'80%',
        backgroundColor:'#e8ebfa',
        alignSelf:'center',
        borderRadius:40,
        borderWidth:0,
        overflow:'scroll'
    },

    drop:{
        width:'80%',
        alignSelf:'center',
        borderRadius:40,
        overflow:'scroll',
        top:50,
        left:'10%',
        maxHeight:hp(40),
        zIndex:999,
        position: 'absolute',
        backgroundColor:'#e8ebfa',
        fontFamily:'Montserrat-Regular'
    },
  });
  
  export default SelectNucleo;
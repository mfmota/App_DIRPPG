import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import CustomMultiPicker from 'react-native-multiple-select-list';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface SelectNucleoProps {
  onSelect: (selectedValues: string[]) => void; 
  selectedValues: (string | number)[];
}

const SelectNucleoPerfil: React.FC<SelectNucleoProps> = ({ onSelect, selectedValues }) => {
  
  const [selected, setSelected] = useState<string[]>(selectedValues.map(String));

  const handleSelect = (val: string[]) => {
    setSelected(val);
    onSelect(val); 
  };

  console.log(selected);
  
  const data = {
    '1': 'DIRPPG-CT' ,
    '2': 'PROPPG' ,
    '3': 'CPGEI' ,
    '4': 'PPGA' ,
    '5': 'PPGCA' ,
    '6': 'PPGCTA' ,
    '7': 'PPGEB' ,
    '8': 'PPGEC' ,
    '9': 'PPGEF' ,
    '10': 'PPGEL' ,
    '11': 'PPGEM' ,
    '12': 'PPGEFA' ,
    '13': 'FCET' ,
    '14': 'PGP' ,
    '15': 'PPGQ' ,
    '16': 'PPGSAU' ,
    '17': 'PPGSE' ,
    '18': 'PPGTE' ,
    '19': 'PROFMAT' ,
    '20': 'PROFIAP' ,
    '21': 'DIREC-CT' ,
    '22': 'DIRGE-CT' ,
    '23': 'DIRPLAD-CT' ,
  };

  const boxHeight = selected.length > 0 ? Math.min(hp(7) + selected.length * 30, hp(8)) : hp(5);

  return (
    <CustomMultiPicker
      options={data}
      search={true}
      multiple={true}
      placeholder="Núcleos"
      returnValue={"value"}
      callback={(val: string[]) => handleSelect(val)} 
      rowBackgroundColor={"#e8ebfa"}
      rowHeight={40}
      rowRadius={5}
      scrollViewHeight={50}
      selected={[selected]}
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

    removeButton:{
      color:'red',
      marginLeft:5,
    },
});

export default SelectNucleoPerfil;
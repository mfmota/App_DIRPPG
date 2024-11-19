import React, { useState, useRef,useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,StyleSheet,Dimensions,} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';

interface DropdownItem {
  id: string;
  name: string;
}

interface CustomDropdownProps {
  selectedValues: string[];
  onSelect: (selectedIds: string[]) => void;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  selectedValues,
  onSelect,
  disabled = false,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>(selectedValues.map(String));

  useEffect(() => {
    setSelected(selectedValues.map(String));
  }, [selectedValues]);
  
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

  const dropdownRef = useRef<View>(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (id: string) => {
    if (disabled) return;
    
    const updatedSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    setSelected(updatedSelected);
    onSelect(updatedSelected);
  };

  const filteredData = search
    ? data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdownHeader, { height: isOpen ? 70 : 50 }]}
        onPress={toggleDropdown}
        disabled={disabled}
      >
        <View style={styles.headerContent}>
          {!selected.length && (
            <FontAwesome name="group" size={16} color="black" />
          )}
          <Text style={styles.selectedText}>
            {selected.length
              ? data
                  .filter((item) => selected.includes(item.id))
                  .map((item) => item.name)
                  .join(', ')
              : '  | Núcleos'}
          </Text>
        </View>
      </TouchableOpacity>
      {isOpen && !disabled &&(
        <View style={styles.dropdownList}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise"
            value={search}
            onChangeText={setSearch}
            editable={!disabled}
          />
          <FlatList
            data={filteredData.sort((a, b) => {
              if (selected.includes(a.id)) return -1;
              if (selected.includes(b.id)) return 1;
              return 0;
            })}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selected.includes(item.id) && styles.selectedItem,
                ]}
                onPress={() => handleSelect(item.id)}
                disabled={disabled}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  dropdownHeader: {
    width: '100%',
    borderRadius: 40,
    backgroundColor: '#e8ebfa',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 14,
    color: '#a1a1a1',

  },
  dropdownList: {
    position: 'absolute',
    top: '90%',
    width: '100%',
    maxHeight:hp(35),
    backgroundColor: '#e8ebfa',
    borderRadius: 20,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  dropdownItem: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  selectedItem: {
    backgroundColor: '#c8d4ff',
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
});

export default CustomDropdown;
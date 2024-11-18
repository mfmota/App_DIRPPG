import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface DropdownItem {
  id: string;
  name: string;
}

interface CustomDropdownProps {
  data: DropdownItem[];
  selectedValues: string[];
  onSelect: (selectedIds: string[]) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  selectedValues,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>(selectedValues);

  const dropdownRef = useRef<View>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (id: string) => {
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
      {/* Dropdown header */}
      <TouchableOpacity
        style={[styles.dropdownHeader, { height: isOpen ? 70 : 50 }]}
        onPress={toggleDropdown}
      >
        <Text style={styles.selectedText}>
          {selected.length
            ? data
                .filter((item) => selected.includes(item.id))
                .map((item) => item.name)
                .join(', ')
            : 'Selecione'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown list */}
      {isOpen && (
        <View style={styles.dropdownList}>
          {/* Search bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={search}
            onChangeText={setSearch}
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

const { width, height } = Dimensions.get('window');

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
  selectedText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownList: {
    position: 'absolute',
    top: 55,
    width: '100%',
    maxHeight: 100,
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

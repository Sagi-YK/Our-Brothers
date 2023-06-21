import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';

const CategoryDropdown = ({ selectedCategory, onSelectCategory, isCategorySelected, setIsCategorySelected }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const categories = [
    'טכנולוגיה',
    'ספורט',
    'בריאות',
    'מוזיקה',
    'ריקוד',
    'תזונה',
    'מפגשים',
    'קריאה וכתיבה',
    'התנדבות',
    'גמ"ח',
    'עמותה',
    'אירוע',
    'שטח',
    'בינלאומי',
    'טיפולי',
    'בידור',
    'אופנה',
    'משפטי',
    'חינוך',
    'שירותים חברתיים',
    'שירותים חינמיים',
    'כלכלי',
    'תחבורה',
    'בעלי חיים',
    'חברה ורוח',
    'תקשורת',
    'בנייה ושיפוץ',
    'פנאי',
    'ילדים ונוער',
    'קבוצה',
    'פוליטיקה',
    'אחר',
    // Add more categories as needed
  ];

  const handleCategoryPress = (category) => {
    setDropdownVisible(false);
    setIsCategorySelected(true);
    onSelectCategory(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>קטגורית המיזם:</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setDropdownVisible(true)} style={[styles.button, !isCategorySelected && styles.invalidInput,]}>
        <Text style={styles.buttonText}>{selectedCategory || 'בחר קטגוריה'}</Text>
      </TouchableOpacity>
      <Modal
        visible={dropdownVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDropdownVisible(false)}
        
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => handleCategoryPress(category)}
                  style={styles.categoryItem}
                >
                  <Text style = {{textAlign: Platform.OS ==='ios'?'right':null}}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: Platform.OS === 'ios'? "right" : null,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invalidButton: {
    borderColor: 'red',
    backgroundColor: 'lightpink',
  },
  buttonText: {
    fontSize: 16,

  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    minWidth: 200,
    maxHeight: '60%',
    
  },
  categoryItem: {
     
    
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default CategoryDropdown;

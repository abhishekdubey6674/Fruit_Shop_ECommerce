import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from './Icon';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search fresh fruits...',
  onSearch,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.01,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleClear = () => {
    setSearchText('');
    onSearch?.('');
  };

  return (
    <Animated.View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
        { transform: [{ scale: scaleAnim }] },
      ]}>
      <View style={styles.iconContainer}>
        <Icon 
          name="search-outline" 
          size={20} 
          color={isFocused ? COLORS.primary : COLORS.textTertiary} 
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textTertiary}
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          onSearch?.(text);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {searchText.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
          activeOpacity={0.7}>
          <Icon name="close-outline" size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    ...SHADOWS.sm,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
  },
  containerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.md,
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md + 4,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.medium,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
});

export default SearchBar;

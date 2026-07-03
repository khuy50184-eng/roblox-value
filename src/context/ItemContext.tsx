
"use client";

import React, { createContext, useState, useEffect, type ReactNode, useMemo, useContext } from 'react';
import type { Item, Rarity, Game, Category } from '@/lib/types';
import mockData, { MOCK_DATA_VERSION, USD_RATE } from '@/lib/mock-data';

// --- Helper Functions ---
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// --- State & Actions Interfaces ---
interface ItemState {
  items: Item[];
  rarities: Rarity[];
  games: Game[];
  categories: Category[];
  selectedItems: Item[];
  searchTerm: string;
  gameFilter: string;
  rarityFilter: string;
  categoryFilter: string;
  isDataLoaded: boolean;
  usdRate: number;
}

interface ItemActions {
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  addRarity: (rarity: Omit<Rarity, 'id'>) => void;
  updateRarity: (rarity: Rarity) => void;
  deleteRarity: (id: string) => void;
  addGame: (game: Omit<Game, 'id'>) => void;
  updateGame: (game: Game) => void;
  deleteGame: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  toggleSelectedItem: (item: Item) => void;
  clearSelection: () => void;
  setSearchTerm: (term: string) => void;
  setGameFilter: (filter: string) => void;
  setRarityFilter: (filter: string) => void;
  setCategoryFilter: (filter: string) => void;
  setUsdRate: (rate: number) => void;
  recalculateAllItemValues: () => void;
}

// --- Contexts ---
const ItemStateContext = createContext<ItemState | undefined>(undefined);
const ItemActionsContext = createContext<ItemActions | undefined>(undefined);

// --- Provider ---
export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [rarities, setRarities] = useState<Rarity[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [usdRate, setUsdRateState] = useState<number>(USD_RATE);

  const [searchTerm, setSearchTerm] = useState('');
  const [gameFilter, setGameFilter] = useState('all');
  const [rarityFilter, setRarityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load from mock data initially, then check localStorage
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem('dataVersion');

      const storedItems = localStorage.getItem('items');
      const storedRarities = localStorage.getItem('rarities');
      const storedGames = localStorage.getItem('games');
      const storedCategories = localStorage.getItem('categories');
      const storedUsdRate = localStorage.getItem('usdRate');

      if (storedVersion === MOCK_DATA_VERSION && storedItems && storedRarities && storedGames && storedCategories && storedUsdRate) {
        setItems(JSON.parse(storedItems));
        setRarities(JSON.parse(storedRarities));
        setGames(JSON.parse(storedGames));
        setCategories(JSON.parse(storedCategories));
        setUsdRateState(JSON.parse(storedUsdRate));
      } else {
        // If version mismatch or no data, use mock data. This will reset user data on version change.
        setItems(mockData.items);
        setRarities(mockData.rarities);
        setGames(mockData.games);
        setCategories(mockData.categories);
        setUsdRateState(mockData.usdRate);

        localStorage.setItem('items', JSON.stringify(mockData.items));
        localStorage.setItem('rarities', JSON.stringify(mockData.rarities));
        localStorage.setItem('games', JSON.stringify(mockData.games));
        localStorage.setItem('categories', JSON.stringify(mockData.categories));
        localStorage.setItem('usdRate', JSON.stringify(mockData.usdRate));
        localStorage.setItem('dataVersion', MOCK_DATA_VERSION);
      }

      const storedSelectedItems = localStorage.getItem('selectedItems');
      if (storedSelectedItems) {
        setSelectedItems(JSON.parse(storedSelectedItems));
      }

    } catch (error) {
      console.warn('Failed to access localStorage, using mock data:', error);
      setItems(mockData.items);
      setRarities(mockData.rarities);
      setGames(mockData.games);
      setCategories(mockData.categories);
      setUsdRateState(mockData.usdRate);
    }

    setIsDataLoaded(true);
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    if (!isDataLoaded) return;
    try {
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('rarities', JSON.stringify(rarities));
        localStorage.setItem('games', JSON.stringify(games));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    } catch (error) {
        console.warn('Failed to save to localStorage:', error);
    }
  }, [items, rarities, games, categories, selectedItems, isDataLoaded]);

   const setUsdRate = (rate: number) => {
    setUsdRateState(rate);
     try {
        localStorage.setItem('usdRate', JSON.stringify(rate));
    } catch (error) {
        console.warn('Failed to save usdRate to localStorage:', error);
    }
  };

  const actions: ItemActions = useMemo(() => ({
    addItem: (item) => setItems(prev => [...prev, { ...item, id: generateId() }]),
    updateItem: (updatedItem) => setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item)),
    deleteItem: (id) => setItems(prev => prev.filter(item => item.id !== id)),
    
    addRarity: (rarity) => setRarities(prev => [...prev, { ...rarity, id: generateId() }].sort((a,b) => a.order - b.order)),
    updateRarity: (updatedRarity) => setRarities(prev => prev.map(r => r.id === updatedRarity.id ? updatedRarity : r).sort((a,b) => a.order - b.order)),
    deleteRarity: (id) => setRarities(prev => prev.filter(r => r.id !== id)),

    addGame: (game) => setGames(prev => [...prev, { ...game, id: generateId() }]),
    updateGame: (updatedGame) => setGames(prev => prev.map(g => g.id === updatedGame.id ? updatedGame : g)),
    deleteGame: (id) => setGames(prev => prev.filter(g => g.id !== id)),
    
    addCategory: (category) => setCategories(prev => [...prev, { ...category, id: generateId() }]),
    updateCategory: (updatedCategory) => setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c)),
    deleteCategory: (id) => setCategories(prev => prev.filter(c => c.id !== id)),
    
    toggleSelectedItem: (itemToToggle) => {
      setSelectedItems(prevSelected => {
        const isSelected = prevSelected.some(item => item.id === itemToToggle.id);
        if (isSelected) {
          return prevSelected.filter(item => item.id !== itemToToggle.id);
        } else {
          return [...prevSelected, itemToToggle];
        }
      });
    },
    clearSelection: () => setSelectedItems([]),
    setSearchTerm,
    setGameFilter: (id) => {
        setGameFilter(id);
        setCategoryFilter('all');
        setRarityFilter('all');
    },
    setRarityFilter,
    setCategoryFilter,
    setUsdRate,
    recalculateAllItemValues: () => {
        // This action is now conceptual. The actual calculation happens on-the-fly.
        // To force a re-render of components that use items, we can just "update" the items state.
        // However, a better approach is to have components re-calculate based on usdRate.
        // This function can be used to explicitly signal a mass update if needed.
        console.log("Recalculating all item values with new rate:", usdRate);
        // No actual state change needed here as calculations are now dynamic.
        // We could force a refresh if components are not re-rendering:
        setItems(prev => [...prev]);
    }
  }), [usdRate]);

  const state: ItemState = {
    items,
    rarities,
    games,
    categories,
    selectedItems,
    searchTerm, 
    gameFilter, 
    rarityFilter, 
    categoryFilter,
    isDataLoaded,
    usdRate,
  };

  return (
    <ItemStateContext.Provider value={state}>
        <ItemActionsContext.Provider value={actions}>
            {children}
        </ItemActionsContext.Provider>
    </ItemStateContext.Provider>
  );
};

export const useItemState = () => {
    const context = useContext(ItemStateContext);
    if (context === undefined) {
        throw new Error('useItemState must be used within an ItemProvider');
    }
    return context;
}

export const useItemActions = () => {
    const context = useContext(ItemActionsContext);
    if (context === undefined) {
        throw new Error('useItemActions must be used within an ItemProvider');
    }
    return context;
}

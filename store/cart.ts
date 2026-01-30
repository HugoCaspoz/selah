import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
    id: number;
    name: string;
    price: number;
    currency: string;
    image: string;
    quantity: number;
};

type CartState = {
    items: Product[];
    isOpen: boolean;
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                }),
            removeItem: (id) =>
                set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'selah-cart-storage',
        }
    )
);

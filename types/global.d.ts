import * as ReactItem from 'react';

declare global {
  namespace React {
    interface ReactNode {}
    interface CSSProperties {}
    type FC<P = {}> = (props: P & { children?: any }) => any;
    function useState<T>(initialState: T | (() => T)): [T, (newState: T | (() => T)) => void];
    function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    function useRef<T>(initialValue: T | null): { current: T | null };
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  type Metadata = any;
}

declare module 'react' {
  export = ReactItem;
}

declare module 'next' {
  export type Metadata = any;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/font/google' {
  export const Barlow: any;
  export const Barlow_Condensed: any;
}

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module 'lucide-react' {
  export const ShoppingCart: any;
  export const LogIn: any;
  export const Search: any;
  export const User: any;
  export const Menu: any;
  export const X: any;
  export const MoveRight: any;
  export const Star: any;
  export const ChevronRight: any;
  export const ArrowRight: any;
  export const Check: any;
  export const Edit: any;
  export const Trash: any;
  export const CreditCard: any;
}

declare module '@/lib/data/products' { export const products: any; }
declare module '@/lib/auth/AuthContext' { export const AuthProvider: any; export const useAuth: any; }
declare module '@/lib/cart/CartContext' { export const CartProvider: any; export const useCart: any; }

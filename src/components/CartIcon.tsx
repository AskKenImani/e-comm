
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';

const CartIcon = () => {
  const { itemCount } = useCart();

  return (
    <Button asChild variant="outline" size="sm" className="relative">
      <Link to="/cart">
        <ShoppingCart className="h-4 w-4" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
};

export default CartIcon;

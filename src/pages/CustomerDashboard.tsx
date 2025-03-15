
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ShoppingBag, Heart, User, CreditCard, 
  MapPin, Home, LogOut, Star 
} from 'lucide-react';
import { 
  useCustomerStats, 
  useCustomerOrders, 
  useWishlist, 
  useAddresses 
} from '@/hooks/use-customer-dashboard';
import { 
  StatCardSkeleton, 
  TableSkeleton, 
  DashboardSkeleton 
} from '@/components/ui/dashboard/loading-state';
import { useToast } from '@/components/ui/use-toast';

const mockOrders = [
  { id: 1234, date: '2023-08-15', items: 2, total: 2050, status: 'Delivered' },
  { id: 1235, date: '2023-09-22', items: 1, total: 850, status: 'Processing' },
  { id: 1236, date: '2023-10-05', items: 3, total: 1750, status: 'Shipped' },
];

const mockWishlist = [
  { id: 1, name: 'Handcrafted Textile Wall Hanging', price: 1200, seller: 'Lakshmi Crafts' },
  { id: 2, name: 'Organic Honey (500g)', price: 350, seller: 'Nature\'s Bounty' },
  { id: 3, name: 'Silver Filigree Earrings', price: 1800, seller: 'Silver Heritage' },
];

const mockAddresses = [
  { id: 1, name: 'Home', address: '123 Main Street, Green Park', city: 'Delhi', state: 'Delhi', pincode: '110016', default: true },
  { id: 2, name: 'Office', address: '456 Business Avenue, Sector 18', city: 'Noida', state: 'UP', pincode: '201301', default: false },
];

const DashboardOverview = () => {
  const { stats, loading, error } = useCustomerStats();
  const { orders, loading: ordersLoading } = useCustomerOrders();
  const { toast } = useToast();
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading dashboard data",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  if (loading) {
    return <DashboardSkeleton />;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.orders.total}</div>
            <p className="text-xs text-muted-foreground">{stats?.orders.recent} orders {stats?.orders.period}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.wishlist.total}</div>
            <p className="text-xs text-muted-foreground">Added {stats?.wishlist.added} {stats?.wishlist.period}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Addresses</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.addresses.total}</div>
            <p className="text-xs text-muted-foreground">{stats?.addresses.names}</p>
          </CardContent>
        </Card>
      </div>

      {ordersLoading ? (
        <TableSkeleton />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Order ID</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Items</th>
                    <th className="text-left p-3">Total</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="p-3">#{order.id}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{order.items}</td>
                        <td className="p-3">₹{order.total}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'Processing' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-4 text-center">No orders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <TableSkeleton />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recently Viewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stats?.recentlyViewed && stats.recentlyViewed.length > 0 ? (
                stats.recentlyViewed.map(item => (
                  <div key={item.id} className="p-4 border rounded-lg text-center">
                    <img src={item.image} alt={item.name} className="mx-auto h-24 w-auto object-cover rounded mb-2" />
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₹{item.price}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-4 text-center">No recently viewed products</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const OrderHistory = () => {
  const { orders, loading, error } = useCustomerOrders();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading orders",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  const filteredOrders = React.useMemo(() => {
    if (activeTab === "all") return orders;
    return orders.filter(order => order.status.toLowerCase() === activeTab);
  }, [orders, activeTab]);
  
  if (loading) {
    return <TableSkeleton rowCount={4} columnCount={6} />;
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order History</h2>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Items</th>
                      <th className="text-left p-4">Total</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">#{order.id}</td>
                          <td className="p-4">{order.date}</td>
                          <td className="p-4">{order.items}</td>
                          <td className="p-4">₹{order.total}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'Processing' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Details</Button>
                              {order.status === 'Delivered' && (
                                <Button variant="secondary" size="sm">
                                  <Star className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-4 text-center">No orders found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Wishlist = () => {
  const { wishlist, loading, error } = useWishlist();
  const { toast } = useToast();
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading wishlist",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-36 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.length > 0 ? (
          wishlist.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="bg-muted rounded-md h-36 flex items-center justify-center">
                    <img 
                      src={`https://source.unsplash.com/random/300x200?${item.name.replace(' ', '+')}`} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">By {item.seller}</p>
                    <p className="font-medium mt-2">₹{item.price}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="default" className="flex-1">Add to Cart</Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 p-4 text-center border rounded-lg">
            <p>Your wishlist is empty</p>
            <Button variant="link" asChild className="mt-2">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const AddressBook = () => {
  const { addresses, loading, error } = useAddresses();
  const { toast } = useToast();
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading addresses",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Address Book</h2>
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Address Book</h2>
        <Button>Add New Address</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length > 0 ? (
          addresses.map(address => (
            <Card key={address.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{address.name}</h3>
                      {address.default && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm mt-2">{address.address}</p>
                    <p className="text-sm">{address.city}, {address.state} - {address.pincode}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    {!address.default && (
                      <Button variant="destructive" size="sm">Delete</Button>
                    )}
                  </div>
                </div>
                {!address.default && (
                  <Button variant="link" className="mt-3 p-0 h-auto">Set as Default</Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 p-4 text-center border rounded-lg">
            <p>You haven't added any addresses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary/60" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Aarti Patel</h3>
              <p className="text-sm text-muted-foreground">aarti.patel@example.com</p>
              <Button variant="link" className="p-0 h-auto mt-1">Change Profile Picture</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input type="text" value="Aarti" className="w-full p-2 rounded-md border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <input type="text" value="Patel" className="w-full p-2 rounded-md border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" value="aarti.patel@example.com" className="w-full p-2 rounded-md border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input type="tel" value="+91 9876543210" className="w-full p-2 rounded-md border" />
            </div>
          </div>
          
          <Button className="mt-6">Save Changes</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <input type="password" className="w-full p-2 rounded-md border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <input type="password" className="w-full p-2 rounded-md border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <input type="password" className="w-full p-2 rounded-md border" />
            </div>
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


const CustomerDashboard = () => { 
  const [pageLoaded, setPageLoaded] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const location = useLocation();
  // const email = location.state?.email || "Guest";
  // console.log("Email:", email);
  const email = location.state?.email || "Guest";
const trimmedEmail = email.replace(/@gmail\.com$/, "");
console.log("Email:", trimmedEmail);


  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []); 


  return (
    <div className={`min-h-screen transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex h-screen overflow-hidden">
        <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r bg-background">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              EmpowerHer
            </Link>
          </div>
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            <Link to="/customer/dashboard" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/customer/dashboard' ? 'bg-accent' : ''}`}>
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/customer/dashboard/orders" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/customer/dashboard/orders' ? 'bg-accent' : ''}`}>
              <ShoppingBag className="h-5 w-5" />
              Orders
            </Link>
            <Link to="/customer/dashboard/wishlist" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/customer/dashboard/wishlist' ? 'bg-accent' : ''}`}>
              <Heart className="h-5 w-5" />
              Wishlist
            </Link>
            <Link to="/customer/dashboard/addresses" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/customer/dashboard/addresses' ? 'bg-accent' : ''}`}>
              <MapPin className="h-5 w-5" />
              Addresses
            </Link>
            <Link to="/customer/dashboard/profile" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/customer/dashboard/profile' ? 'bg-accent' : ''}`}>
              <User className="h-5 w-5" />
              Profile
            </Link>
          </nav>
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                Log Out
              </Link>
            </Button>
          </div>
        </aside>
        
        <div className="flex flex-col flex-1 md:pl-64">
          <header className="sticky top-0 z-10 border-b bg-background">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="md:hidden">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                  EmpowerHer
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium"><h1>Hello, {trimmedEmail}!!</h1></span>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="addresses" element={<AddressBook />} />
              <Route path="profile" element={<ProfileSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

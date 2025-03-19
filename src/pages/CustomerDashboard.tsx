
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
import axios from "axios";
import { useNavigate } from "react-router-dom";




const DashboardOverview = () => {
  const { stats, loading: statsLoading, error: statsError } = useCustomerStats();
  const { toast } = useToast();

  // State for recent orders
  const [orders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  const username = localStorage.getItem("username"); // Fetch stored username
  const [wishlistItems, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [ordersCount, setOrdersCount] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [addressCount, setAddressCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      // .then((res) => setAddresses(res.data.addresses || []))
      .then((res) => {
        console.log("Raw Response:", res);
        setRecentOrders(res.data[0]?.orders || []);
        //address
        setAddresses(res.data[0]?.addresses || []);
        const address_count = res.data[0]?.address?.length || 0;
        console.log("address:", address_count);
        
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      setOrdersLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/customer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Raw Response:", res);
        setRecentOrders(res.data[0]?.orders || []);
        const ordersCount = res.data[0]?.orders?.length || 0;
        console.log("Orders Count:", ordersCount);
        console.log("Orders:", res.data[0]?.orders);
        
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrdersError(error);
      })
      .finally(() => {
        setOrdersLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      setLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Raw Response:", res);
        setWishlist(res.data.wishlist || []); // Ensure it's always an array
        const wishlistCount = res.data?.wishlist?.length || 0;
        setWishlistCount(wishlistCount);
        console.log("Wishlist Count:", wishlistCount);
        
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      setOrdersLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/customer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Raw Response:", res);
        setRecentOrders((res.data[0]?.orders || []).slice(0, 2));
        const ordersCount = res.data[0]?.orders?.length || 0;
        setOrdersCount(ordersCount);
        console.log("Orders Count:", ordersCount);
        console.log("Orders:", res.data[0]?.orders);

      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrdersError(error);
      })
      .finally(() => {
        setOrdersLoading(false);
      });
  }, []);

  useEffect(() => {
    if (statsError || ordersError) {
      toast({
        title: "Error loading data",
        description: statsError?.message || ordersError?.message,
        variant: "destructive",
      });
    }
  }, [statsError, ordersError, toast]);

  if (statsLoading || ordersLoading) {
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
            <div className="text-2xl font-bold">{ordersCount}</div>
            <p className="text-xs text-muted-foreground">{stats?.orders.recent} orders {stats?.orders.period}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wishlistCount}</div>
            <p className="text-xs text-muted-foreground">Added {stats?.wishlist.added} {stats?.wishlist.period}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Addresses</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{addressCount}</div>
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
                    orders.map((order, index) => (
                      <tr key={order.id || index} className="border-b">
                        <td className="p-3">#{order.id}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{Array.isArray(order.items) ? order.items.join(", ") : order.items}</td>
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

      
    </div>
  );
};



const OrderHistory = () => {
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const { stats, loading: statsLoading, error: statsError } = useCustomerStats();

  // State for recent orders
  const [orders, setRecentOrders] = useState([]);
  const [loading, setOrdersLoading] = useState(true);
  const [error, setOrdersError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      setOrdersLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/customer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Raw Response:", res);
        setRecentOrders(res.data[0]?.orders || []);

      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrdersError(error);
      })
      .finally(() => {
        setOrdersLoading(false);
      });
  }, []);
  
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
  const { toast } = useToast();
  const username = localStorage.getItem("username"); // Fetch stored username
  const [wishlistItems, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("username:", username);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      setLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Raw Response:", res);
        setWishlist(res.data.wishlist || []); // Ensure it's always an array
        const wishlistCount = res.data?.wishlist?.length || 0;
        console.log("Wishlist Count:", wishlistCount);
        
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("Updated Wishlist State:", wishlistItems);
  }, [wishlistItems]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading wishlist",
        description: error.message || "Something went wrong!",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="bg-muted rounded-md h-36 flex items-center justify-center">
                    <img
                      src={`https://source.unsplash.com/random/300x200?${item.name.replace(
                        " ",
                        "+"
                      )}`}
                      alt={item.name}
                      className="max-h-full max-w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      By {item.seller}
                    </p>
                    <p className="font-medium mt-2">₹{item.price}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="default" className="flex-1">
                      Add to Cart
                    </Button>
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
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAddresses(res.data.addresses || []))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://empowerher-server.onrender.com/api/add-address", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAddresses([...addresses, res.data]); // Add new address to UI
        setNewAddress({ name: "", street: "", city: "", state: "", zipcode: "", country: "" });
        setShowForm(false);
        toast({ title: "Address added successfully", variant: "success" });
      })
      .catch((err) => toast({ title: "Error adding address", description: err.message, variant: "destructive" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Address Book</h2>
        <Button onClick={() => setShowForm(!showForm)}>Add New Address</Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border p-4 rounded-lg space-y-3">
          <input type="text" name="name" placeholder="Name" value={newAddress.name} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="street" placeholder="Street" value={newAddress.street} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="zipcode" placeholder="Zipcode" value={newAddress.zipcode} onChange={handleChange} required className="border p-2 w-full" />
          <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleChange} required className="border p-2 w-full" />
          <Button type="submit" className="w-full">Save Address</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{address.name}</h3>
                    <p className="text-sm mt-2">{address.street}</p>
                    <p className="text-sm">{address.city}, {address.state} - {address.zipcode}</p>
                    <p className="text-sm">{address.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 p-4 text-center border rounded-lg">
            <p>No addresses found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []); // Corrected placement of dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

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
              <h3 className="font-medium text-lg">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Button variant="link" className="p-0 h-auto mt-1">Change Profile Picture</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input type="text" value={user?.firstName || ""} className="w-full p-2 rounded-md border" readOnly/>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <input type="text" value={user?.lastName || ""} className="w-full p-2 rounded-md border" readOnly/>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" value={user?.email || ""} className="w-full p-2 rounded-md border" readOnly/>
            </div>
            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input type="tel" value={user?.phone || ""} className="w-full p-2 rounded-md border" readOnly/>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

//add route to shop page




const CustomerDashboard = () => { 
  const [pageLoaded, setPageLoaded] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if token is missing
    }
  }, []);



useEffect(() => {
  console.log(token);
  if (!token) {
    console.log(token);
    console.error("No token found");
    return;
  }

  axios
    .get("https://empowerher-server.onrender.com/user", {
      headers: {  Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      console.log("User data:", response.data.message);
      setData(response.data.message);  // ✅ Set entire response data
    })
    .catch((error) => console.error("Error fetching protected data", error));
}, [token]);



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
            <Link to="/products" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/customer/dashboard/shop' ? 'bg-accent' : ''}`}>
            <ShoppingBag className="h-5 w-5" />
            Shop
          </Link>

          </nav>
          <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              localStorage.removeItem("token"); // Remove token
              navigate("/login"); // Redirect to login page
            }}
          >
            <div className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              Log Out
            </div>
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
              <span className="text-sm font-medium">
  {data && <h1>Hello, {data}!!</h1>}
</span>
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


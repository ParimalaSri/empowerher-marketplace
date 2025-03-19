import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart-components';
import { 
  Package, ShoppingBag, Users, CreditCard, 
  BarChart3, Home, Settings, LogOut, PlusCircle
} from 'lucide-react';
import { useSellerStats, useSellerOrders, useSellerProducts } from '@/hooks/use-seller-dashboard';
import { 
  StatCardSkeleton, 
  TableSkeleton, 
  ChartSkeleton, 
  DashboardSkeleton 
} from '@/components/ui/dashboard/loading-state';
import { useToast } from '@/components/ui/use-toast';
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DashboardOverview = () => {
  const { stats, loading, error } = useSellerStats();
  const { orders, loading: ordersLoading } = useSellerOrders();
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats?.revenue.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.revenue.change > 0 ? '+' : ''}{stats?.revenue.change}% from {stats?.revenue.period}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.productsSold.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.productsSold.change > 0 ? '+' : ''}{stats?.productsSold.change}% from {stats?.productsSold.period}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.newCustomers.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.newCustomers.change > 0 ? '+' : ''}{stats?.newCustomers.change}% from {stats?.newCustomers.period}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingOrders.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.pendingOrders.change > 0 ? '+' : ''}{stats?.pendingOrders.change} since {stats?.pendingOrders.period}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.salesData ? (
              <LineChart data={stats.salesData} />
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p>No sales data available</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.productCategories ? (
              <PieChart data={stats.productCategories} />
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p>No category data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
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
                      <th className="text-left p-2">Order ID</th>
                      <th className="text-left p-2">Customer</th>
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map(order => (
                        <tr key={order.id} className="border-b">
                          <td className="p-2">#{order.id}</td>
                          <td className="p-2">{order.customer}</td>
                          <td className="p-2">{order.product}</td>
                          <td className="p-2">₹{order.amount}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'Processing' 
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">No orders found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// const ProductsManagement = () => {
//   const { products, loading, error } = useSellerProducts();
//   const { toast } = useToast();
  
//   useEffect(() => {
//     if (error) {
//       toast({
//         title: "Error loading products",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   }, [error, toast]);
  
//   if (loading) {
//     return <TableSkeleton rowCount={4} columnCount={5} />;
//   }
  
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Products</h2>
//         <Button>
//           <PlusCircle className="h-4 w-4 mr-2" />
//           Add Product
//         </Button>
//       </div>
      
//       <Card>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left p-4">Product</th>
//                   <th className="text-left p-4">Price</th>
//                   <th className="text-left p-4">Stock</th>
//                   <th className="text-left p-4">Sold</th>
//                   <th className="text-left p-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.length > 0 ? (
//                   products.map(product => (
//                     <tr key={product.id} className="border-b hover:bg-muted/50">
//                       <td className="p-4">{product.name}</td>
//                       <td className="p-4">₹{product.price}</td>
//                       <td className="p-4">{product.stock}</td>
//                       <td className="p-4">{product.sold}</td>
//                       <td className="p-4">
//                         <div className="flex gap-2">
//                           <Button variant="outline" size="sm">Edit</Button>
//                           <Button variant="destructive" size="sm">Delete</Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="p-4 text-center">No products found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    seller: "",
    stock: "",
    sold: "0",
  });


  useEffect(() => {
    const token = localStorage.getItem("token");
    
        if (!token) {
          console.error("No token found!");
          setLoading(false);
          return;
        }
    
        axios
          .get("https://empowerher-server.onrender.com/api/get-products", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log("Raw Response:", res);
            setProducts(res.data|| []); // Ensure it's always an array
            
          })
          .catch((error) => {
            console.error("Error fetching wishlist:", error);
            setError(error);
          })
          .finally(() => {
            setLoading(false);
          });

   
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Validate and add product
  const handleAddProduct = async () => {
    // Validation: Ensure required fields are not empty
    if (!productData.name || !productData.category || !productData.seller) {
      console.error("Missing required fields.");
      alert("Please fill all required fields: Name, Category, and Seller.");
      return;
    }

    const formattedProductData = {
      ...productData,
      price: Number(productData.price) || 0,
      stock: Number(productData.stock) || 0,
      sold: Number(productData.sold) || 0,
    };

    console.log("Sending Data:", formattedProductData);

    try {
      const response = await axios.post(
        "https://empowerher-server.onrender.com/api/add-product",
        formattedProductData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Product added successfully:", response.data);

      // Update product list
      setProducts([...products, response.data]);

      // Close modal and reset fields
      setIsDialogOpen(false);
      setProductData({
        name: "",
        price: "",
        image: "",
        category: "",
        seller: "",
        stock: "",
        sold: "0",
      });
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={() => setShowModal(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Stock</th>
                  <th className="text-left p-4">Sold</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">₹{product.price}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">{product.sold}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogTitle>Add New Product</DialogTitle>
          <div className="space-y-4">
            <Input name="name" placeholder="Product Name" onChange={handleInputChange} />
            <Input name="price" placeholder="Price" type="number" onChange={handleInputChange} />
            <Input name="image" placeholder="Image URL" onChange={handleInputChange} />
            <Input name="category" placeholder="Category" onChange={handleInputChange} />
            <Input name="seller" placeholder="Seller" onChange={handleInputChange} />
            <Input name="stock" placeholder="Stock" type="number" onChange={handleInputChange} />
            <Button onClick={handleAddProduct}>Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token on Orders Management:", token);

    if (!token) {
      console.error("No token found!");
      setLoading(false);
      return;
    }

    axios
      .get("https://empowerher-server.onrender.com/api/seller-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched Orders:", res.data);
        setOrders(res.data || []); // Ensure it's always an array
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
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
    console.log("Active Tab:", activeTab); // Debugging
    console.log("All Orders:", orders); // Debugging

    if (activeTab === "all") return orders;
    return orders.filter(
      (order) =>
        order["Status"] &&
        order["Status"].toLowerCase() === activeTab.toLowerCase()
    );
  }, [orders, activeTab]);

  if (loading) {
    return <TableSkeleton rowCount={4} columnCount={6} />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>

      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order["Order ID"]}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="p-4">#{order["Order ID"]}</td>
                      <td className="p-4">{order["Customer"]}</td>
                      <td className="p-4">{order["Product"]}</td>
                      <td className="p-4">₹{order["Amount"]}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order["Status"]?.toLowerCase() === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order["Status"]?.toLowerCase() === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order["Status"]?.toLowerCase() === "shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order["Status"]}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SellerDashboard = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const location = useLocation(); 
  const token = localStorage.getItem("token");
  const [data, setData] = useState("");
  


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
            <Link to="/seller/dashboard" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/seller/dashboard' ? 'bg-accent' : ''}`}>
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/seller/dashboard/products" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/seller/dashboard/products' ? 'bg-accent' : ''}`}>
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link to="/seller/dashboard/orders" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/seller/dashboard/orders' ? 'bg-accent' : ''}`}>
              <ShoppingBag className="h-5 w-5" />
              Orders
            </Link>
            <Link to="/seller/dashboard/analytics" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/seller/dashboard/analytics' ? 'bg-accent' : ''}`}>
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Link>
            <Link to="/seller/dashboard/settings" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent ${location.pathname === '/seller/dashboard/settings' ? 'bg-accent' : ''}`}>
              <Settings className="h-5 w-5" />
              Settings
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
                <span className="text-sm font-medium">Welcome, {data}!!</span>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
              <Route path="analytics" element={<div className="text-2xl font-bold">Analytics (Coming Soon)</div>} />
              <Route path="settings" element={<div className="text-2xl font-bold">Settings (Coming Soon)</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

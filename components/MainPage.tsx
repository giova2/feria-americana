'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Search } from "lucide-react"

export function MainPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Connect, Shop, and Make a Difference
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Buy, sell, or donate clothes while connecting with fashion enthusiasts in your area.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Search for items or events" type="text" />
                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Explore FashionConnect</h2>
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="donate">Donate</TabsTrigger>
              </TabsList>
              <TabsContent value="buy">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <img
                          alt={`Clothing item ${i}`}
                          className="w-full h-48 object-cover rounded-md"
                          height="200"
                          src={`/placeholder.svg?height=200&width=300`}
                          width="300"
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle>Stylish Outfit {i}</CardTitle>
                        <CardDescription>Great condition, barely worn</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <span className="text-lg font-bold">${(Math.random() * 100).toFixed(2)}</span>
                        <Button>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="sell">
                <Card>
                  <CardHeader>
                    <CardTitle>List Your Item for Sale</CardTitle>
                    <CardDescription>Provide details about the item you want to sell</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="Item Name" />
                      <Input placeholder="Description" />
                      <Input placeholder="Price" type="number" />
                      <Input type="file" />
                      <Button type="submit" className="w-full">List Item</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="donate">
                <Card>
                  <CardHeader>
                    <CardTitle>Donate Your Clothes</CardTitle>
                    <CardDescription>Help others by donating your gently used clothing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="Item Description" />
                      <Input placeholder="Condition" />
                      <Input type="file" />
                      <Button type="submit" className="w-full">Offer Donation</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Connect and Create Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Find Nearby Fashion Enthusiasts</CardTitle>
                  <CardDescription>Connect with people who share your style</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input placeholder="Your Location" />
                    <Button type="submit" className="w-full">Find Connections</Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Create a Fashion Event</CardTitle>
                  <CardDescription>Organize meetups, swap parties, or fashion shows</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input placeholder="Event Name" />
                    <Input placeholder="Location" />
                    <Input type="date" />
                    <Button type="submit" className="w-full">Create Event</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
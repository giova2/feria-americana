'use client'

import {  
  Card,
  CardBody,
  CardHeader,
 } from "@nextui-org/react"
import Title from "./ui/title"
import NearByContactForm from "./forms/NearbyContactForm"
import FashionEventForm from "./forms/FashionEventForm"

import React from "react"
import TopSection from "./TopSection"
import TabsSection from "./TabsSection"

export function MainPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <TopSection />
      </section>
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32">
        <TabsSection />
      </section>
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Connect and Create Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <CardHeader className="flex flex-col items-start">
                <Title>Find Nearby Fashion Enthusiasts</Title>
                <p>Connect with people who share your style</p>
              </CardHeader>
              <CardBody>
                <NearByContactForm />
              </CardBody>
            </Card>
            <Card className="p-4">
              <CardHeader className="flex flex-col items-start">
                <Title>Create a Fashion Event</Title>
                <p>Organize meetups, swap parties, or fashion shows</p>
              </CardHeader>
              <CardBody>
                <FashionEventForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
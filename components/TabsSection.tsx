import { PRODUCTS_MOCK } from '@/mocks/products';
import { Card, CardBody, CardHeader, Tab, Tabs } from '@heroui/react';
import React, { Key } from 'react'
import ItemCard from './ItemCard/ItemCard';
import SellForm from './forms/SellForm';
import Title from './ui/title';
import DonateForm from './forms/DonateForm';

type TabsSectionProps = {
  selectedTab?: Key
}

const TabsSection: React.FC<TabsSectionProps> = ({ selectedTab = 'buy' }) => {
  const [selected, setSelected] = React.useState<Key>(selectedTab);

  return(
    <div className="container px-4 md:px-6">
      <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Explore FashionConnect</h2>
      <Tabs aria-label="Options" selectedKey={selected.toString()} onSelectionChange={setSelected as (key: Key) => void}>
        <Tab key="buy" title="Buy">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS_MOCK.map((item) => (
              <React.Fragment key={item.name}>
                <ItemCard {...item} />
              </React.Fragment>
            ))}
          </div>
        </Tab>
        <Tab key="sell" title="Sell">
          <Card>
            <CardHeader className="flex flex-col items-start">
              <Title>List Your Item for Sale</Title>
              <p>Provide details about the item you want to sell</p>
            </CardHeader>
            <CardBody>
              <SellForm />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="donate" title="Donate">
          <Card>
            <CardHeader className="flex flex-col items-start">
              <Title>Donate Your Clothes</Title>
              <p>Help others by donating your gently used clothing</p>
            </CardHeader>
            <CardBody>
              <DonateForm />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export { TabsSection as default }
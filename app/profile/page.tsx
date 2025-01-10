"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from 'react'

export default function ProfilePage() {
  useEffect(() => {
    console.log('Profile page mounted')
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and saved items</p>
        </div>
        <Button onClick={() => console.log('Edit Profile clicked')}>Edit Profile</Button>
      </div>

      <Tabs defaultValue="saved" className="w-full" onValueChange={(value) => console.log(`Tab changed to: ${value}`)}>
        <TabsList>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
          <TabsTrigger value="applied">Applied Grants</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="saved">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Saved Grants</CardTitle>
                <CardDescription>Grants you've bookmarked for later</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No saved grants yet</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Saved Research</CardTitle>
                <CardDescription>Research papers you're interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No saved research yet</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Saved Discoveries</CardTitle>
                <CardDescription>Serendipitous findings you've saved</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No saved discoveries yet</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="applied">
          <Card>
            <CardHeader>
              <CardTitle>Applied Grants</CardTitle>
              <CardDescription>Track your grant applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No applications yet</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive updates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Configure your notification settings</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

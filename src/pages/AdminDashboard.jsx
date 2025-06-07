"use client"

import { useState, useEffect, useRef } from "react"
import { User, Plus, RefreshCw, Check, LogOut, Home, ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  // State for dashboard data
  const [stats, setStats] = useState({
    totalDonations: 1234,
    totalDonationsPercentage: 12,
    monthlyDonations: 120,
    monthlyDonationsPercentage: 5,
    activeDonors: 856,
    activeDonorsPercentage: 8,
    activeBeneficiaries: 642,
    activeBeneficiariesPercentage: 15,
  })

  const [pendingDonations, setPendingDonations] = useState([
    {
      id: "1",
      donorName: "Kompania X",
      description: "Pako Ushqimore 1",
      city: "Mitrovicë",
      status: "Në Pritje",
    },
    {
      id: "2",
      donorName: "Kompania Z",
      description: "Pako Ushqimore 2",
      city: "Prishtinë",
      status: "Në Pritje",
    },
  ])

  const [activities, setActivities] = useState([
    {
      id: "1",
      type: "donation_accepted",
      description: "Donacion i pranuar nga Përfituesi X",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      icon: "default",
    },
    {
      id: "2",
      type: "new_beneficiary",
      description: "Përfitues i ri i regjistruar",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      icon: "default",
    },
    {
      id: "3",
      type: "new_donation",
      description: "Donacion i ri nga Kompania Z",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      icon: "plus",
    },
  ])

  const [loading, setLoading] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [profileMenuRef])

  // Handle dashboard navigation
  const navigateToDashboard = () => {
    console.log("Navigating to dashboard")
    setProfileMenuOpen(false)
    // In a real app, you would use router.push('/dashboard') or similar
  }

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out")
    setProfileMenuOpen(false)
    // In a real app, you would call your logout API and redirect to login page
  }

  // Fetch dashboard data from backend
  useEffect(() => {
    // In a real application, you would fetch data from your backend here
    setLoading(false)
  }, [])

  // Handle donation approval - move to history immediately
  const handleApproveDonation = async (donationId) => {
    try {
      // Find the donation to approve
      const donationToApprove = pendingDonations.find((donation) => donation.id === donationId)

      if (!donationToApprove) return

      // Create a new activity for the approved donation
      const newActivity = {
        id: `activity-${Date.now()}`,
        type: "donation_accepted",
        description: `Donacion i pranuar nga ${donationToApprove.donorName}`,
        timestamp: new Date().toISOString(),
        icon: "check",
      }

      // Update the UI immediately
      setPendingDonations(pendingDonations.filter((donation) => donation.id !== donationId))
      setActivities([newActivity, ...activities])

      // Update stats
      setStats((prevStats) => ({
        ...prevStats,
        totalDonations: prevStats.totalDonations + 1,
        monthlyDonations: prevStats.monthlyDonations + 1,
      }))

      // In a real application, you would also call your backend API
      console.log(`Approved donation ${donationId} and moved to history`)
    } catch (error) {
      console.error("Error approving donation:", error)
    }
  }

  // Handle donation rejection
  const handleRejectDonation = async (donationId) => {
    try {
      // Find the donation to reject
      const donationToReject = pendingDonations.find((donation) => donation.id === donationId)

      if (!donationToReject) return

      // Create a new activity for the rejected donation
      const newActivity = {
        id: `activity-${Date.now()}`,
        type: "donation_rejected",
        description: `Donacion i refuzuar nga ${donationToReject.donorName}`,
        timestamp: new Date().toISOString(),
        icon: "reject",
      }

      // Update the UI immediately
      setPendingDonations(pendingDonations.filter((donation) => donation.id !== donationId))
      setActivities([newActivity, ...activities])

      // In a real application, you would also call your backend API
      console.log(`Rejected donation ${donationId} and moved to history`)
    } catch (error) {
      console.error("Error rejecting donation:", error)
    }
  }

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Tani"
    }

    return `Para ${diffInHours} orë`
  }

  // Render activity icon based on type
  const renderActivityIcon = (activity) => {
    switch (activity.icon) {
      case "plus":
        return (
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
            <Plus className="h-6 w-6 text-white" />
          </div>
        )
      case "check":
        return (
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
            <Check className="h-6 w-6 text-white" />
          </div>
        )
      case "reject":
        return (
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shrink-0">
            <User className="h-6 w-6 text-white" />
          </div>
        )
      default:
        return <div className="w-12 h-12 bg-gray-200 shrink-0"></div>
    }
  }

  // Custom Avatar component
  const Avatar = ({ children, className, ...props }) => {
    return (
      <div className={`relative inline-block rounded-full overflow-hidden ${className || ""}`} {...props}>
        {children}
      </div>
    )
  }

  // Custom Button component
  const Button = ({ children, className, onClick, ...props }) => {
    return (
      <button
        className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className || ""}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  }

  // Custom Badge component
  const Badge = ({ children, className, ...props }) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className || ""}`}
        {...props}
      >
        {children}
      </span>
    )
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading dashboard data...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-gray-200">
            <div className="flex items-center justify-center h-full w-full text-gray-500">NT</div>
          </Avatar>
          <span className="font-medium">Ndihmo Tjetrin</span>
        </div>
        <div className="flex items-center gap-2 relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <Avatar className="h-8 w-8 bg-gray-200">
              <div className="flex items-center justify-center h-full w-full text-gray-500">FF</div>
            </Avatar>
            <span className="font-medium">Filan Fisteku</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
                <Link to="/">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={navigateToDashboard}
              >
                <Home className="h-4 w-4" />
                Landing Page
              </button>
              </Link>
              <Link to="/login">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Dashboard Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Pulti Kontrollues për Admin</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-500">Donacionet Totale</span>
                <RefreshCw className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.totalDonations.toLocaleString()}</div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-200 mr-2"></div>
                <span className="text-green-500 text-sm">{stats.totalDonationsPercentage}% këtë muaj</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-500">Donacionet Këtë Muaj</span>
                <RefreshCw className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.monthlyDonations}</div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-200 mr-2"></div>
                <span className="text-green-500 text-sm">{stats.monthlyDonationsPercentage}% këtë muaj</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-500">Donatorët Aktiv</span>
                <div className="w-5 h-5 bg-gray-200"></div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.activeDonors}</div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-200 mr-2"></div>
                <span className="text-blue-500 text-sm">{stats.activeDonorsPercentage}% këtë muaj</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-500">Përfituesit Aktiv</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.activeBeneficiaries}</div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-200 mr-2"></div>
                <span className="text-purple-500 text-sm">{stats.activeBeneficiariesPercentage}% këtë muaj</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Table Section - Responsive */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-700">Donacionet në Pritje</h2>
          </div>

          {/* Desktop Table - Hidden on mobile */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 text-gray-500 font-medium">Donatori</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Përshkrimi</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Qyteti</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Statusi</th>
                  <th className="text-left p-6 text-gray-500 font-medium">Shqyrto</th>
                </tr>
              </thead>
              <tbody>
                {pendingDonations.length > 0 ? (
                  pendingDonations.map((donation) => (
                    <tr key={donation.id} className="border-b">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-orange-500 rounded-full p-2">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <span>{donation.donorName}</span>
                        </div>
                      </td>
                      <td className="p-6">{donation.description}</td>
                      <td className="p-6">{donation.city}</td>
                      <td className="p-6">
                        <Badge className="bg-amber-100 text-amber-800">{donation.status}</Badge>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          <Button
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleApproveDonation(donation.id)}
                          >
                            Prano
                          </Button>
                          <Button
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleRejectDonation(donation.id)}
                          >
                            Refuzo
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      Nuk ka donacione në pritje
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - Shown only on mobile */}
          <div className="md:hidden">
            {pendingDonations.length > 0 ? (
              <div className="divide-y">
                {pendingDonations.map((donation) => (
                  <div key={donation.id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-orange-500 rounded-full p-2">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{donation.donorName}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Përshkrimi</p>
                        <p>{donation.description}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Qyteti</p>
                        <p>{donation.city}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Statusi</p>
                        <Badge className="bg-amber-100 text-amber-800">{donation.status}</Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-1.5"
                        onClick={() => handleApproveDonation(donation.id)}
                      >
                        Prano
                      </Button>
                      <Button
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1.5"
                        onClick={() => handleRejectDonation(donation.id)}
                      >
                        Refuzo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">Nuk ka donacione në pritje</div>
            )}
          </div>
        </div>


        {/* Activity History Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-700">Historia e Aktivitetit</h2>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    {renderActivityIcon(activity)}
                    <div>
                      <p className="text-gray-700 font-medium">{activity.description}</p>
                      <p className="text-gray-500 text-sm">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">Nuk ka aktivitete të fundit</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


import { useState, useEffect } from "react"
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Card, CardContent, Box, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  BarChart,
  AreaChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  Area,
} from "recharts"
import { AnalyticsService } from "../../services/api"

const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}))

const DashboardPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "auto",
  width: "auto",
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
}))

const InfoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

// // Mock AnalyticsService
// const AnalyticsService = {
//   getOwnerAnalytics: () =>
//     Promise.resolve({
//       Bookings: {
//         "Total Bookings Today": 2,
//         "Total bookings this week": 16,
//         "Total bookings this month": 16,
//         "Total canceled bookings this month": 4,
//         "Most booked property this month": {
//           accommodation_id: 1,
//           total: 16,
//         },
//         "Least booked property this month": {
//           accommodation_id: 1,
//           total: 16,
//         },
//         "Average stay days per booking": "25.4400",
//         "Longest stay booking this month": {
//           booking_id: 36,
//           accommodation_id: 1,
//           user_id: 1,
//           max: 46,
//         },
//         "Most common check-in day": 1,
//       },
//       Revenue: {
//         "Total revenue this month": "99002.00",
//         "Average rent per booking": "9000.181818",
//       },
//       GuestEngagement: {
//         "Most common booking preference": "Couples",
//         "Visits converted into bookings this month": 3,
//         "Percentage of scheduled visits converted to bookings": 15,
//       },
//       Visits: {
//         "Total visits scheduled today": 2,
//         "Total visits scheduled this week": 3,
//         "Most visited property": {
//           accommodation_id: 1,
//           total: 20,
//         },
//         "Least visited property": {
//           accommodation_id: 1,
//           total: 20,
//         },
//       },
//       PropertyPerformance: {
//         "Overall occupancy rate": 2.4390243902439024,
//         "Highest occupancy rate property": {
//           rate: 2500,
//           Accommodation: 1,
//         },
//         "Lowest occupancy rate property": {
//           rate: 2500,
//           Accommodation: 1,
//         },
//         "Average booking lead days": "21.6000",
//         "Properties fully booked at least once per month": [1],
//       },
//       Reviews: {
//         "New reviews received this month": 22,
//         "Average rating across all properties": "4.5455",
//         "Highest-rated property": {
//           accommodation_id: 1,
//           total: 22,
//           avg_rating: "4.5455",
//         },
//         "Lowest-rated property": {
//           accommodation_id: 1,
//           total: 22,
//           avg_rating: "4.5455",
//         },
//       },
//     }),
// }

const InfoCardDet = ({ title, value }) => {

  return (
    <Card sx={{ bgcolor: "", p: 2, borderRadius: 3, minWidth: 150 }}>
      <CardContent>
        <Typography variant="subtitle2" fontWeight={50} color="gray" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" fontWeight={500}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

function BookingAnalytics({ data }) {
  if (!data) return <Typography>No booking data available</Typography>

  const chartData = [
    { name: "Today", bookings: data["Total Bookings Today"] || 0 },
    { name: "This Week", bookings: data["Total bookings this week"] || 0 },
    { name: "This Month", bookings: data["Total bookings this month"] || 0 },
  ]
  const bookingData = [
    { title: "Total Canceled Bookings", value: data["Total canceled bookings this month"] },
    { title: "Average Stay Duration", value: `${data["Average stay days per booking"]} days` },
    { title: "Most Common Check-in Day", value: `Day ${data["Most common check-in day"]}` },
    { title: "Most Booked Property", value: `ID: ${data["Most booked property this month"].accommodation_id}, Total: ${data["Most booked property this month"].total}` },
    { title: "Longest Stay Booking", value: `Booking ID: ${data["Longest stay booking this month"].booking_id}, Duration: ${data["Longest stay booking this month"].max} days` },
  ];


  return (
    <>
      <Typography variant="h6" gutterBottom mb={2} >
        Booking Analytics
      </Typography>
      <Card sx={{ mb: 2, p: 2 }}>
        <ResponsiveContainer width="100%" height={300} >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {bookingData.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <InfoCardDet title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function RevenueAnalytics({ data }) {
  if (!data) return <Typography>No revenue data available</Typography>

  const chartData = [
    {
      name: "This Month",
      revenue: Number.parseFloat(data["Total revenue this month"]),
      averageRent: Number.parseFloat(data["Average rent per booking"]),
    },
  ]
  const revenueData = [
    { title: "Total Revenue This Month", value: `₹${Number.parseFloat(data["Total revenue this month"]).toFixed(2)}` },
    { title: "Average Rent per Booking", value: `₹${Number.parseFloat(data["Average rent per booking"]).toFixed(2)}` },
  ];


  return (
    <>
      <Typography variant="h6" gutterBottom mb={2}>
        Revenue Analytics
      </Typography>
      <Card sx={{ mb: 2, p: 2 }}>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="averageRent" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {revenueData.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <InfoCardDet title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function GuestEngagementAnalytics({ data }) {
  if (!data) return <Typography>No guest engagement data available</Typography>

  const convertedVisits = data["Visits converted into bookings this month"] || 0
  const conversionRate = data["Percentage of scheduled visits converted to bookings"] || 0

  const chartData = [
    { name: "Converted", value: convertedVisits },
    { name: "Not Converted", value: 100 - conversionRate },
  ]
  const engagementData = [
    { title: "Most Common Booking Preference", value: data["Most common booking preference"] },
    { title: "Visits Converted to Bookings This Month", value: convertedVisits },
    { title: "Conversion Rate", value: `${conversionRate}%` },
  ]

  const COLORS = ["#00C49F", "#FFBB28"]

  return (
    <>
      <Typography variant="h6" gutterBottom mb={2}>
        Guest Engagement Analytics
      </Typography>
      <Card sx={{ mb: 2, p: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
      <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {engagementData.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <InfoCardDet title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function VisitAnalytics({ data }) {
  if (!data) return <Typography>No visit data available</Typography>

  const chartData = [
    { name: "Today", visits: data["Total visits scheduled today"] || 0 },
    { name: "This Week", visits: data["Total visits scheduled this week"] || 0 },
  ]
  const visitData = [
    { title: "Most Visited Property", value: `ID: ${data["Most visited property"].accommodation_id}, Visits: ${data["Most visited property"].total}` },
    { title: "Least Visited Property", value: `ID: ${data["Least visited property"].accommodation_id}, Visits: ${data["Least visited property"].total}` },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom mb={2}>
        Visit Analytics
      </Typography>
      <Card sx={{ mb: 2, p: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visits" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {visitData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <InfoCardDet title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function PropertyPerformanceAnalytics({ data }) {
  if (!data) return <Typography>No property performance data available</Typography>

  const overallOccupancy = data?.["Overall occupancy rate"] || 0;
  const highestOccupancy = data?.["Highest occupancy rate property"]?.rate || 0;
  const lowestOccupancy = data?.["Lowest occupancy rate property"]?.rate || 0;
  const avgLeadTime = data?.["Average booking lead days"] || "N/A";
  const fullyBookedProperties = data?.["Properties fully booked at least once per month"] || [];

  const chartData = [
    { subject: "Overall Occupancy", A: overallOccupancy, fullMark: 100 },
    { subject: "Highest Occupancy", A: highestOccupancy, fullMark: 100 },
    { subject: "Lowest Occupancy", A: lowestOccupancy, fullMark: 100 },
  ];

  const propertyData = [
    {
      title: "Highest Occupancy Rate Property",
      value: `ID: ${data?.["Highest occupancy rate property"]?.Accommodation || "N/A"}, Rate: ${highestOccupancy}%`,
    },
    {
      title: "Lowest Occupancy Rate Property",
      value: `ID: ${data?.["Lowest occupancy rate property"]?.Accommodation || "N/A"}, Rate: ${lowestOccupancy}%`,
    },
    { title: "Average Booking Lead Days", value: `${avgLeadTime} days` },
    { title: "Properties Booked(30 days)", value: fullyBookedProperties.length ? fullyBookedProperties.join(", ") : "None" },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom mb={2}>
        Property Performance Analytics
      </Typography>
      <Card sx={{ mb: 2, p: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Radar name="Occupancy" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
      <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {propertyData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <InfoCardDet title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function ReviewAnalytics({ data }) {
  if (!data) return <Typography>No review data available</Typography>

  const avgRating = Number.parseFloat(data?.["Average rating across all properties"]) || 0;
  const highestRated = data?.["Highest-rated property"];
  const lowestRated = data?.["Lowest-rated property"];
  const newReviews = data?.["New reviews received this month"] || 0;

  const chartData = [
    { name: "Average", rating: avgRating },
    { name: "Highest", rating: Number.parseFloat(highestRated?.avg_rating) || 0 },
    { name: "Lowest", rating: Number.parseFloat(lowestRated?.avg_rating) || 0 },
  ];

  const reviewDetails = [
    { title: "New Reviews This Month", value: newReviews },
    { title: "Average Rating Across All Properties", value: `${avgRating.toFixed(2)}` },
    {
      title: "Highest Rated Property",
      value: highestRated
        ? `ID: ${highestRated.accommodation_id}, Rating: ${Number.parseFloat(highestRated.avg_rating).toFixed(2)}`
        : "N/A",
    },
    {
      title: "Lowest Rated Property",
      value: lowestRated
        ? `ID: ${lowestRated.accommodation_id},Rating: ${Number.parseFloat(lowestRated.avg_rating).toFixed(2)}`
        : "N/A",
    },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom mb={2}>
        Review Analytics
      </Typography>
      <Card sx={{ mb: 2, p: 2 }} >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Grid container spacing={2}>
        {reviewDetails.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <InfoCardDet title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default function AdminDashboard() {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await AnalyticsService.getOwnerAnalytics()
        setAnalyticsData(data.data)
        console.log(data.data)
      } catch (error) {
        console.error("Error fetching analytics:", error)
        setError("Failed to fetch analytics data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  if (!analyticsData) {
    return <Typography>No analytics data available</Typography>
  }

  return (
    <DashboardContainer maxWidth="lg" sx={{ mt: 10, mb: 2, bgcolor: "#fafafb" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={6} justifyContent={"center"}>
        <Grid item xs={12} md={6} lg={6}>
          <DashboardPaper>
            <BookingAnalytics data={analyticsData.Bookings} />
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <DashboardPaper>
            <RevenueAnalytics data={analyticsData.Revenue} />
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <DashboardPaper>
            <GuestEngagementAnalytics data={analyticsData.GuestEngagement} />
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <DashboardPaper>
            <VisitAnalytics data={analyticsData.Visits} />
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <DashboardPaper>
            <PropertyPerformanceAnalytics data={analyticsData.PropertyPerformance} />
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <DashboardPaper>
            <ReviewAnalytics data={analyticsData.Reviews} />
          </DashboardPaper>
        </Grid>
      </Grid>
    </DashboardContainer>
  )
}




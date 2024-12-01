import React from 'react';
// Hook to fetch order details by ID
import { useGetOrderByIdQuery } from '../../../redux/features/orderApi';
// React Router hook to retrieve dynamic route parameters
import { useParams } from 'react-router-dom';
// Custom component for rendering timeline steps
import TimelineStep from '../../../components/TimelineStep';

const OrderDetails = () => {
    // Retrieve the orderId from the route parameters
    const { orderId } = useParams();
    console.log(orderId); // Debug: Log the orderId

    // Fetch order details using RTK Query
    const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>No orders!</div>;

    // Helper function to determine if a status is completed
    const isCompleted = (status) => {
        const statuses = ["pending", "processing", "shipped", "completed"];
        return statuses.indexOf(status) < statuses.indexOf(order.status);
    };

    // Helper function to determine if a status is the current step
    const isCurrent = (status) => order.status === status;

    // Define the timeline steps with status, labels, and descriptions
    const steps = [
        {
          status: 'pending',
          label: 'Pending',
          description: 'Your order has been created and is awaiting processing.',
          icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
        },
        {
          status: 'processing',
          label: 'Processing',
          description: 'Your order is currently being processed.',
          icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
        },
        {
          status: 'shipped',
          label: 'Shipped',
          description: 'Your order has been shipped.',
          icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
        },
        {
          status: 'completed',
          label: 'Completed',
          description: 'Your order has been successfully completed.',
          icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
        },
    ];

    return (
        // Main container for the order details section
        <section className='section__container rounded p-6'>
            {/* Order status and basic information */}
            <h2 className='text-2xl font-semibold mb-4'>Payment {order?.status}</h2>
            <p className='mb-4'>Order Id: {order?.orderId}</p>
            <p className='mb-8'>Status: {order?.status}</p>

            {/* Timeline for order status */}
            <ol className='sm:flex items-center relative'>
                {
                    // Map through the steps to render the timeline
                    steps.map((step, index) => (
                        <TimelineStep
                            key={index} // Unique key for each timeline step
                            step={step} // Step details (status, label, description, etc.)
                            order={order} // Current order details
                            isCompleted={isCompleted(step.status)} // Determine if this step is completed
                            isCurrent={isCurrent(step.status)} // Determine if this step is the current status
                            isLastStep={index === steps.length - 1} // Check if this is the last step
                            icon={step.icon} // Icon for the step
                            description={step.description} // Description for the step
                        />
                    ))
                }
            </ol>
        </section>
    );
};

export default OrderDetails;

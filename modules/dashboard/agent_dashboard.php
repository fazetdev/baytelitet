<?php
/**
 * Professional Agent Dashboard - Test Version
 * Using Mock Data for testing purposes.
 */

class AgentDashboard {
    private $agentId;

    public function __construct($agentId) {
        $this->agentId = $agentId;
    }

    // Mock Lead Data for testing
    public function getMyLeads() {
        return [
            ['name' => 'John Doe', 'status' => 'New', 'phone' => '555-0101'],
            ['name' => 'Sarah Smith', 'status' => 'Follow-up', 'phone' => '555-0202'],
            ['name' => 'Mike Ross', 'status' => 'Pending', 'phone' => '555-0303']
        ];
    }

    // Mock Property Data for testing
    public function getMyProperties() {
        return [
            ['address' => '123 Sunset Blvd', 'price' => '50,000', 'type' => 'Sale'],
            ['address' => '888 Ocean Drive', 'price' => ',500/mo', 'type' => 'Rent']
        ];
    }
}

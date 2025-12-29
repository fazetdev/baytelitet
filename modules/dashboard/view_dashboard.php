<?php
require_once 'agent_dashboard.php';

// Simulate an Agent ID for testing
$current_agent_id = 101;
$dashboard = new AgentDashboard($current_agent_id);

echo "<div style='font-family: sans-serif; padding: 10px;'>";
echo "<h2>Agent ID: " . $current_agent_id . " Dashboard</h2>";

// Display Leads
echo "<h3>Active Lead Queue</h3>";
echo "<table border='1' cellpadding='8' style='width:100%; border-collapse: collapse; margin-bottom: 20px;'>
        <tr style='background: #333; color: white;'>
            <th>Name</th>
            <th>Status</th>
            <th>Contact</th>
        </tr>";

foreach ($dashboard->getMyLeads() as $lead) {
    echo "<tr>
            <td>{$lead['name']}</td>
            <td><span style='background: #eee; padding: 2px 5px;'>{$lead['status']}</span></td>
            <td>{$lead['phone']}</td>
          </tr>";
}
echo "</table>";

// Display Properties
echo "<h3>Managed Properties</h3>";
echo "<table border='1' cellpadding='8' style='width:100%; border-collapse: collapse;'>
        <tr style='background: #333; color: white;'>
            <th>Address</th>
            <th>Value</th>
            <th>Type</th>
        </tr>";

foreach ($dashboard->getMyProperties() as $prop) {
    echo "<tr>
            <td>{$prop['address']}</td>
            <td>{$prop['price']}</td>
            <td>{$prop['type']}</td>
          </tr>";
}
echo "</table>";
echo "</div>";

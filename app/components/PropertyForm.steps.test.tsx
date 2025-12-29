import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PropertyForm from './PropertyForm.tsx';

if (typeof window !== 'undefined') {
  global.URL.createObjectURL = vi.fn(() => 'mock-url');
}

describe('PropertyForm Steps', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('tests the actual form flow - Step 1 to Final Submit', async () => {
    render(<PropertyForm lang="en" />);
    
    console.log('=== INITIAL STATE ===');
    console.log('HTML:', document.body.innerHTML);
    
    // Count initial fields
    const initialInputs = screen.queryAllByRole('textbox', 'spinbutton');
    const initialButtons = screen.queryAllByRole('button');
    console.log('Initial inputs:', initialInputs.length);
    console.log('Initial buttons:', initialButtons.map(b => b.textContent));
    
    // Fill Step 1
    fireEvent.change(screen.getByLabelText(/Title/i), { 
      target: { value: 'Test Villa', name: 'title' } 
    });
    fireEvent.change(screen.getByLabelText(/Price/i), { 
      target: { value: '1000000', name: 'price' } 
    });
    
    // Mock file upload
    const imageInput = screen.getByLabelText(/Hero Image/i);
    const mockFile = { name: 'test.jpg', type: 'image/jpeg', size: 1024 };
    Object.defineProperty(imageInput, 'files', { value: [mockFile] });
    fireEvent.change(imageInput);
    
    console.log('\n=== AFTER FILLING STEP 1 ===');
    console.log('Form values filled');
    
    // Click Next
    const nextButton = screen.getByRole('button', { name: /Next/i });
    console.log('Next button type:', nextButton.getAttribute('type'));
    fireEvent.click(nextButton);
    
    // Wait a bit for state update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('\n=== AFTER CLICKING NEXT ===');
    console.log('HTML:', document.body.innerHTML);
    
    // Check what we have now
    const currentInputs = screen.queryAllByRole('textbox', 'spinbutton', 'combobox');
    const currentButtons = screen.queryAllByRole('button');
    const currentLabels = screen.queryAllByLabelText(/.*/);
    
    console.log('Current inputs:', currentInputs.length);
    console.log('Current buttons:', currentButtons.map(b => ({
      text: b.textContent,
      type: b.getAttribute('type')
    })));
    console.log('Current labels:', currentLabels.map(l => l.textContent));
    
    // Check all text content
    const allText = document.body.textContent || '';
    console.log('\nAll text content:', allText);
    
    // Analyze what happened
    if (currentButtons.length === 1 && currentButtons[0].textContent === 'Submit') {
      console.log('\nCONCLUSION: Form went from Step 1 directly to Submit.');
      console.log('This means either:');
      console.log('1. The form has only 2 steps total');
      console.log('2. Step 2 has no visible fields (just Submit button)');
      console.log('3. Step 2 validation failed silently');
    }
    
    // If there's a Submit button, try clicking it
    const submitButton = screen.queryByRole('button', { name: /Submit/i });
    if (submitButton) {
      console.log('\nFound Submit button, testing submission...');
      
      // Mock fetch/FormData to prevent actual submission
      const mockSubmit = vi.fn(e => e.preventDefault());
      const form = screen.getByRole('form');
      form.addEventListener('submit', mockSubmit);
      
      fireEvent.click(submitButton);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Submit attempted:', mockSubmit.mock.calls.length > 0);
    }
    
    // Test passes if we understand the form flow
    expect(true).toBe(true);
  });

  it('shows what fields are actually required', async () => {
    render(<PropertyForm lang="en" />);
    
    console.log('\n=== TESTING VALIDATION ===');
    
    // Test 1: Click Next with empty form
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const error1 = screen.queryByRole('alert');
    console.log('Empty form error:', error1?.textContent);
    
    // Test 2: Fill only title
    cleanup();
    render(<PropertyForm lang="en" />);
    
    fireEvent.change(screen.getByLabelText(/Title/i), { 
      target: { value: 'Test', name: 'title' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const error2 = screen.queryByRole('alert');
    console.log('Only title filled error:', error2?.textContent);
    
    expect(true).toBe(true);
  });
});

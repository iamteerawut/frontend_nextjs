"use client"
import { useState } from 'react';

import { sendEmail } from '../actions/userAction';

import { Email } from '../types/Email';

const EmailForm = () => {

    const [emailForm, setEmailForm] = useState<Email>({ sender: '', receiver: '', subject: '', body: '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setEmailForm({ ...emailForm, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('sent mail');
        event.preventDefault();
        const formData = new FormData(event?.currentTarget);
        await sendEmail(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Sent email</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sender</label>
                <input type="email" id="sender" name="sender" required value={emailForm.sender} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Sender Email" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Receiver</label>
                <input type="email" id="receiver" name="receiver" required value={emailForm.receiver} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Receiver Email" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" id="subject" name="subject" required value={emailForm.subject} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Subject" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="body" name="body" required value={emailForm.body} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </form>
    );
};

export default EmailForm;

import React, { useState } from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
export function ModalDeleteExpenses({ open, onClose, onConfirm }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-200"/>
                        <h3 className="mb-5 text-lg font-normal text-gray-400">
                            Êtes-vous sûr de vouloir supprimer cette dépense ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                onClick={onConfirm}
                            >
                                Oui, je suis sûr
                            </button>
                            <button
                                type="button"
                                className="py-2.5 px-5 text-sm font-medium focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 rounded-lg border"
                                onClick={onClose}
                            >
                                Non, annuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

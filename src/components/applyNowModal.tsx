// import { Dialog, Transition } from '@headlessui/react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Lottie from 'lottie-react';
// import * as React from 'react';
// import { Fragment } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import storeCustomerData from '../CustomerDataClient';

// import carAnimation from '../images/lotties/car.json';

// const formSchema = yup.object({
//   email: yup
//     .string()
//     .email('Please enter a valid email address')
//     .required('Please enter your email address')
// });

// const ApplyNowModal: React.FC<PageProps> = (props) => {
//   const {
//     modalOpen,
//     setModalOpen,
//     selectedMake,
//     selectedModel,
//     selectedDescription,
//     submitted,
//     setSubmitted,
//     loading,
//     setLoading
//   } = props;

//   const handleClose = () => {
//     // setSubmitted(false); // This will cause flickering
//     setModalOpen(false); // Close the modal
//   };

//   async function onSubmit(values: any): Promise<any> {
//     const customerData = {
//       email: values.email,
//       selectedMake,
//       selectedModel,
//       selectedDescription
//     };

//     console.log('storing email...');
//     setLoading(true);
//     const response = await storeCustomerData(customerData);
//     const randomDelay = Math.floor(Math.random() * 2000) + 1000;

//     typeof window !== 'undefined' &&
//       process.env.NODE_ENV !== 'development' &&
//       window.gtag('event', 'generate_lead', {
//         currency: 'AUD',
//         value: 0
//       });

//     setTimeout(() => {
//       setLoading(false); // Hide loading animation
//       if (response === 200) {
//         setSubmitted(true);
//       }
//     }, randomDelay);
//   }

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: yupResolver(formSchema)
//   });

//   return (
//     <Fragment>
//       <Transition appear show={modalOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-50"
//           onClose={() => setModalOpen(false)}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium text-center leading-6 text-gray-900"
//                   >
//                     {submitted
//                       ? loading
//                         ? ''
//                         : 'Thank You for Registering!'
//                       : loading
//                       ? ''
//                       : 'Your dream car is a (much cheaper!) step away.'}
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-center text-gray-500 mb-4">
//                       {submitted
//                         ? loading
//                           ? ''
//                           : "We'll be in touch."
//                         : loading
//                         ? ''
//                         : "Enter your email and we'll get back to you shortly!"}
//                     </p>
//                   </div>
//                   <form onSubmit={handleSubmit((data) => onSubmit(data))}>
//                     <div>
//                       <div className="mt-1">
//                         {!submitted && !loading ? (
//                           <input
//                             id="email"
//                             name="email"
//                             type="email"
//                             placeholder="you@example.com"
//                             {...register('email')}
//                             className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
//                           />
//                         ) : (
//                           <div />
//                         )}
//                       </div>
//                       {errors.email && (
//                         <div className="flex items-center pointer-events-none mt-2 text-red-600">
//                           <svg
//                             className="h-5 w-5 text-red-500 mr-1"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           {errors.email.message}
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-4 text-center">
//                       {loading ? (
//                         <Lottie animationData={carAnimation} /> // Show the loading animation
//                       ) : submitted ? (
//                         <button
//                           type="button"
//                           className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
//                           onClick={handleClose}
//                         >
//                           Close
//                         </button>
//                       ) : (
//                         <button
//                           type="submit"
//                           className="inline-flex justify-center text-white rounded-3xl border border-transparent bg-primary px-8 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
//                         >
//                           Submit
//                         </button>
//                       )}
//                     </div>
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </Fragment>
//   );
// };

// export default ApplyNowModal;

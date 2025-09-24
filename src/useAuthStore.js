import { create } from "zustand"
import { axiosInstance } from "./lib/axios"
import axios from "axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({

    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {

        try {

            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })

        } catch (error) {

            console.log('Error in authCheck', error)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }

    },

    signup: async (formData) => {

        set({ isSigningUp: true })
        try {

            const res = await axiosInstance.post('/auth/signup',formData)
            set({ authUser: res.data })

            toast.success("Account Created Successfully")

        } catch (error) {

            toast.error(error.response.data.message)
            console.log("Error in Signup function", error)
            set({ authUser: null })

        }
        finally {
            set({ isSigningUp: false })
        }

    }







}))
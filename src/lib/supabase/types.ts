export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          original_price: number
          images: string[]
          colors: string[]
          category: string
          is_new: boolean
          is_bestseller: boolean
          description: string
          sizes?: string[]
          stock: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          original_price: number
          images: string[]
          colors: string[]
          category: string
          is_new?: boolean
          is_bestseller?: boolean
          description: string
          sizes?: string[]
          stock: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          original_price?: number
          images?: string[]
          colors?: string[]
          category?: string
          is_new?: boolean
          is_bestseller?: boolean
          description?: string
          sizes?: string[]
          stock?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: Json[]
          total: number
          status: string
          shipping_address: Json
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: Json[]
          total: number
          status?: string
          shipping_address: Json
          payment_method: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: Json[]
          total?: number
          status?: string
          shipping_address?: Json
          payment_method?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
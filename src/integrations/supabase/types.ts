export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          achievement_name: string
          description: string
          earned_at: string
          category: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          achievement_name: string
          description: string
          earned_at?: string
          category: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          achievement_name?: string
          description?: string
          earned_at?: string
          category?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          family_name: string
          id: string
          league: string
          member_count: number
          points: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          family_name: string
          id: string
          league?: string
          member_count?: number
          points?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          family_name?: string
          id?: string
          league?: string
          member_count?: number
          points?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_actions: {
        Row: {
          action_id: string
          action_title: string
          completed_at: string
          id: string
          photo_url: string | null
          points_earned: number
          user_id: string
        }
        Insert: {
          action_id: string
          action_title: string
          completed_at?: string
          id?: string
          photo_url?: string | null
          points_earned: number
          user_id: string
        }
        Update: {
          action_id?: string
          action_title?: string
          completed_at?: string
          id?: string
          photo_url?: string | null
          points_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      user_tutorials: {
        Row: {
          completed_at: string | null
          id: string
          tutorial_completed: boolean
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          tutorial_completed?: boolean
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          tutorial_completed?: boolean
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
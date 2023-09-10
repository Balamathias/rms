import { toast } from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase
  .from('cabins')
  .select('*')

  if (error) throw new Error('Could not fetch Cabins')

  return data
}


export async function deleteCabin(id) {
  
  const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if (!error) toast.success('Cabin deleted Successfully.')
  if (error) toast.error('Could not delete cabin.')
  // if (error) throw new Error(`Could not delete Cabin!: ${error.message}.`)
  // console.log(error)

  return data === null ? {} : data
}


export async function createEditCabin(cabin, id) {

  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${cabin?.image?.name}`.replaceAll('/', '')
  const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // console.log(imagePath)

  const query = supabase.from('cabins')

  if (!id) {
    await query
    .insert([{...cabin, image: imagePath}])
    .select().single()
  }

  if (id) {
    await query
    .update({...cabin, image: imagePath})
    .eq('id', id)
    .select()
    .single()
  }
  
  const { data, error } = query

  if (error) throw new Error('Could not add Cabin, Please try again!')
  if (hasImagePath) return data
  
  const { error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, cabin?.image)

  if (storageError) {
    await supabase
    .from('cabin-images')//
    .delete()
    .eq('id', data.id)
    throw new Error('Could not add Cabin image and the cabin could not be created, Please try again!')
  }

  return data
}


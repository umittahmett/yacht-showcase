'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function createProduct(formData: any) {
  const supabase = await createClient()

  console.log('formData', formData.get('features'))

  // redirect('/dashboard')
}

const exampleFormData = {
  base_informations: {
    name: 'Salvador Tanner',
    crew: 'Unde reprehenderit l',
    about: 'Dolores corporis iur'
  },
  general_features: {
    watermaker: false,
    hot_tub: false,
    satphone: false,
    lcd_tv_in_lounge: false,
    music_system_in_cabins: false,
    cd_player_in_cabins: false,
    game_cards: false,
    wi_fi: false,
    ice_maker: false,
    standard_safety_equipment: false,
    navigator_device: false,
    dvd_player_in_cabins: false,
    lcd_tv_in_cabins: false,
    safe_vault: false,
    satellite_connection: false,
    hair_dryer: false,
    freezer: false,
    movable_platform: false,
    refrigerator: false,
    water_toys: false,
    backgammon: false,
    dvd_player_in_lounge: false,
    hi_fi_music_in_lounge: false,
    cd_player_in_lounge: false,
    radio_transciever: false
  },
  cabin_details: {
    double_cabin: false,
    master_cabin: false,
    twin_cabin: false,
    trible_cabin: false,
    personnel_cabin: false,
    personnel_recreational_area: false,
    fully_fledged_kitchen: false,
    indoor_and_outdoor_dining_areas: false,
    indoor_and_outdoor_resting_areas: false,
    american_bar: false
  },
  services: {
    harbor_fees_and_checkout: false,
    costs_of_transit_log_document_and_shipping_agency_for_necessary_procedures: false,
    cost_of_moorage: false,
    crew_service: false,
    utility_water: false,
    fuel_costs_on_route: false,
    quilt_cover_and_bathroom_sets: false,
    free_use_of_boat_equipments: false,
    yacht_insurance_individual_travel_insurance_is_recommended: false,
    yacht_provisions_and_drinks: false,
    keelage_and_customs_expenses_on_foreign_territorial_waters: false,
    vat: false,
    airport_transfers: false,
    use_of_fuel_operated_water_sports_equipment_if_available_on_boat: false
  },
  technical_specifications: {
    year_of_construction: '2007',
    length: 'Sed dignissimos numq',
    width: 'Ut enim debitis id ',
    cabin: 'Pariatur Unde unde ',
    capacity: 'Corporis rerum nisi ',
    personnel: 'Veniam placeat mai',
    engine: 'Eligendi doloremque ',
    generator: 'Ab rerum ea omnis fu',
    air_conditioning: false,
    wc: false
  },
  water_sports: {
    service_boat: false,
    snorkelling_and_fishing_equipments: false,
    canoe: false
  }
}
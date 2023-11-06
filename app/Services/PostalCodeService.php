<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class PostalCodeService
{
    public function getAddress($postalCode)
    {
        // Check if the postal code is cached
        if (Cache::has($postalCode)) {
            return Cache::get($postalCode);
        }

        ini_set('memory_limit', '-1');

        // load the json file
        $json = file_get_contents(storage_path('app/postal_codes.json'));

        // decode the json to an associative array
        $postalCodes = json_decode($json, true);

        // search for the postal code
        foreach ($postalCodes as $postalCodeData) {
            if ($postalCodeData['POSTAL'] == $postalCode) {

                // Cache the postal code with the address into redis
                Cache::set($postalCode, $postalCodeData['ADDRESS']);

                // Return the address
                return $postalCodeData['ADDRESS'];
            }
        }
    }
}

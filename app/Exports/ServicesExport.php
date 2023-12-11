<?php

namespace App\Exports;

use App\Models\Service;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ServicesExport implements FromCollection, WithHeadings
{
    /**
    * @return Collection
    */
    public function collection(): Collection
    {
        return Service::all();
    }

    public function headings(): array
    {
        return [
            '#',
            'Service Report ID',
            'Service Request',
            'Service Type',
            'No of Technician',
            'No of Service Time',
            'Service Date',
            'Service Time',
            'Status',
            'Service At',
            'Created At',
            'Updated At',
        ];
    }
}

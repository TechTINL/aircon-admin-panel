<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'duration_hours',
        'duration_minutes',
        'cost',
        'service_id',
    ];

    public function service(){
        return $this->belongsTo(Service::class);
    }
}

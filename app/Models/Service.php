<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $appends = ['employee_ids'];
    protected $fillable = [
        'name',
        'type',
        'technician_count',
        'service_date',
        'service_time',
        'service_at',
        'status',
        'service_no_of_time',
        'contract_id',
        'service_address',
        'billing_address',
        'client_id',
        'sub_client_id',
        'service_number',
        'report_status',
        'technician_report',
        'task_visitation_note',
        'client_signature',
    ];

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class);
    }

    public function setServiceDateAttribute($value)
    {
        $this->attributes['service_date'] = Carbon::createFromFormat('m/d/Y', $value)->format('Y-m-d');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'service_user')
            ->withPivot('assigned_as')
            ->withTimestamps();
    }
    public function getEmployeeIdsAttribute()
    {
        return $this->users()->pluck('id')->toArray();
    }

    public function leaders(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'service_user')
            ->withPivot('assigned_as')
            ->wherePivot('assigned_as', 'team_leader')
            ->withTimestamps();
    }

    public function technicians(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'service_user')
            ->withPivot('assigned_as')
            ->wherePivot('assigned_as', 'technician')
            ->withTimestamps();
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function subClient(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'subClient_id');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class);
    }


    protected static function boot()
    {
        parent::boot();

        static::created(function ($service) {
            $currentDate = now()->format('dmy');
            $serviceId = str_pad($service->id, 5, '0', STR_PAD_LEFT);

            $service->service_number = $currentDate . '-SR-' . $serviceId;
            $service->save();
        });
    }
}

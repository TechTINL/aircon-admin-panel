<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Console\View\Components\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contract extends Model
{
    use HasFactory;

	protected $fillable = [
		'title',
		'contract_number',
		'service_count',
        'unassigned_service_count',
        'assigned_service_count',
        'billing_address',
        'service_address',
		'start_date',
		'end_date',
		'amount',
		'client_id',
		'subClient_id',
	];
    public function setStartDateAttribute($value)
    {
        $this->attributes['start_date'] = Carbon::createFromFormat('m/d/Y', $value)->format('Y-m-d');
    }
    public function setEndDateAttribute($value)
    {
        $this->attributes['end_date'] = Carbon::createFromFormat('m/d/Y', $value)->format('Y-m-d');
    }
	public function client(): BelongsTo
	{
		return $this->belongsTo(Client::class);
	}

	public function subClient(): BelongsTo
	{
		return $this->belongsTo(Client::class, 'subClient_id', 'id');
	}

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

	protected static function boot()
	{
		parent::boot();

		static::created(function ($contract) {
			$currentDate = now()->format('dmy');
			$contractId = str_pad($contract->id, 5, '0', STR_PAD_LEFT);

			$contract->contract_number = $currentDate . '-CO-' . $contractId;
			$contract->save();
		});
	}
}

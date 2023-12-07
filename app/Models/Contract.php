<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
		'start_date',
		'end_date',
		'amount',
		'client_id',
		'subClient_id',
	];

	public function client(): BelongsTo
	{
		return $this->belongsTo(Client::class);
	}

	public function subClient(): BelongsTo
	{
		return $this->belongsTo(Client::class, 'client_id', 'id');
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

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
			$table->string('title');
			$table->string('contract_number')->nullable();
            $table->integer('unassigned_service_count')->nullable();
            $table->integer('assigned_service_count')->nullable();
			$table->integer('service_count');
            $table->string('service_address');
            $table->string('billing_address');
			$table->string('start_date');
			$table->string('end_date');
			$table->string('amount');
	        $table->foreignId('client_id')->constrained('clients');
	        $table->foreignId('subClient_id')->nullable()->constrained('clients');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
